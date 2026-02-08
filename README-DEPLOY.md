# README - Deploy

The project contains a docker and caddy setup. This allows for easy deployment.

## Prerequisites

- Docker and Docker Compose installed on the local machine
- SSH access to the production server
- Git repository with push access

## Environment Variables

The `.env` file requires:
- `PROD_SSH_HOST`: SSH connection string (e.g., `user@hostname`)
- `PROD_SERVER_APP_DIR`: Directory on server where the app is deployed

## Deployment Steps

1. Modify the `Caddyfile` to use the correct domain name
2. Copy the `.env.example` to `.env` and fill in the missing fields
3. Run `npm run deploy`. This will:
   - Create a new version tag (depending on the latest changes/commits)
   - Update the `CHANGELOG.md` file
   - Connect to the server specified in the `.env` file, pull the changes,
     build the new docker container, add a version tag to the new image, stop
     the old container and start the new one

Done!

## Rollback

Docker images are tagged with version numbers (e.g., `application-patient-care-app:v0.0.5`).

To list available versions on the server:
```bash
docker images application-patient-care-app
```

To rollback to a previous version:

1. SSH to the server
2. Edit `docker-compose.yml`: replace `build: .` with `image: application-patient-care-app:v<VERSION>`
3. Run:
   ```bash
   docker compose down
   docker compose up -d
   ```
4. After confirming the rollback works, revert the docker-compose.yml change
