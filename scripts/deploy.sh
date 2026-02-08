#!/bin/bash
set -e
set -o pipefail

# ==============================================================================
# Deploy Script for application-patient-care
# ==============================================================================
# This script handles the full deployment workflow:
# 1. Validates local/remote git state
# 2. Bumps version and updates changelog
# 3. Pushes to remote
# 4. Deploys to production server via SSH
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

# --- Parse Arguments ---
DEPLOY_ONLY=false

show_help() {
    echo "Usage: ./deploy.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -d, --deploy-only   Skip version bump and git push, only deploy to server"
    echo "  -h, --help          Show this help message"
    exit 0
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--deploy-only)
            DEPLOY_ONLY=true
            shift
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            ;;
    esac
done

# --- Colors for output ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# --- Load Configuration ---
ENV_FILE="$ROOT_DIR/.env"

if [ -f "$ENV_FILE" ]; then
    set -a
    source "$ENV_FILE"
    set +a
else
    log_error "Configuration file '$ENV_FILE' not found."
    log_info "Copy .env.example to .env and configure it."
    exit 1
fi

# Check for required deployment variables
if [[ -z "$PROD_SSH_HOST" || -z "$PROD_SERVER_APP_DIR" ]]; then
    log_error "Missing required deployment variables in $ENV_FILE:"
    log_error "  PROD_SSH_HOST, PROD_SERVER_APP_DIR"
    exit 1
fi

# --- Get Version Helper ---
get_version() {
    node -p "require('$ROOT_DIR/package.json').version"
}

if [[ "$DEPLOY_ONLY" == false ]]; then
    # --- Git State Validation ---
    log_info "Validating git state..."

    # Fetch latest from remote (without merging)
    git fetch origin

    # Check for unpushed commits
    UNPUSHED=$(git log origin/main..HEAD --oneline 2>/dev/null)
    if [[ -n "$UNPUSHED" ]]; then
        log_error "You have unpushed commits:"
        echo "$UNPUSHED"
        log_error "Please push your changes before deploying."
        exit 1
    fi

    # Check if remote has changes we don't have
    UNPULLED=$(git log HEAD..origin/main --oneline 2>/dev/null)
    if [[ -n "$UNPULLED" ]]; then
        log_error "Remote has commits that you don't have locally:"
        echo "$UNPULLED"
        log_error "Please pull the latest changes before deploying."
        exit 1
    fi

    log_info "Git state validated: local and remote are in sync."

    # --- Get Current Version (before bump) ---
    CURRENT_VERSION=$(get_version)
    if [[ -z "$CURRENT_VERSION" ]]; then
        log_error "Failed to detect current version."
        exit 1
    fi
    log_info "Current version: v$CURRENT_VERSION"

    # --- Bump Version ---
    log_info "Bumping version and updating changelog..."
    cd "$ROOT_DIR"
    npm run release

    NEW_VERSION=$(get_version)
    if [[ -z "$NEW_VERSION" ]]; then
        log_error "Failed to detect new version after bump."
        exit 1
    fi
    log_info "New version: v$NEW_VERSION"

    # --- Push to Remote ---
    log_info "Pushing to remote..."
    cd "$ROOT_DIR"
    git push && git push --tags
else
    log_info "Deploy-only mode: skipping version bump and git push"
    NEW_VERSION=$(get_version)
    if [[ -z "$NEW_VERSION" ]]; then
        log_error "Failed to detect current version."
        exit 1
    fi
    log_info "Current version: v$NEW_VERSION"
fi

# --- Deploy to Production ---
log_info "Deploying to $PROD_SSH_HOST..."

# Define the image name with version (must match docker-compose service name)
IMAGE_NAME="application-patient-care-app"

ssh "$PROD_SSH_HOST" "bash -s" <<EOF
    set -e
    cd $PROD_SERVER_APP_DIR

    echo "--> Pulling latest code..."
    git fetch --tags
    git checkout main
    git pull origin main

    # TODO: Add database backup script before deployment
    # echo "--> Running Backup..."
    # chmod +x scripts/backup-sqlite.sh
    # ./scripts/backup-sqlite.sh

    echo "--> Building Docker image with version tag..."
    docker compose build

    # Tag the image with version for rollback capability
    docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:v${NEW_VERSION}

    echo "--> Restarting services..."
    docker compose down
    docker compose up -d

    echo "--> Cleaning up old images (keeping tagged versions)..."
    docker image prune -f

    echo "--> Deployment complete!"
    echo "    Running version: v${NEW_VERSION}"
    echo "    Image tagged as: ${IMAGE_NAME}:v${NEW_VERSION}"
EOF

log_info "Deployment Complete!"

if [[ "$DEPLOY_ONLY" == false ]]; then
    echo ""
    log_info "Latest Changelog:"
    echo "----------------------------------------"
    head -25 CHANGELOG.md
    echo "----------------------------------------"
fi

echo ""
log_info "To rollback to a previous version, on the server run:"
echo "    docker compose down"
echo "    docker run -d --name app ${IMAGE_NAME}:v<VERSION>"
