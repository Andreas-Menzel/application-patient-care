import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Read root package.json version
const rootPkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
const version = rootPkg.version;

// Workspaces to sync
const workspaces = ['shared', 'frontend', 'backend'];

for (const workspace of workspaces) {
  const pkgPath = join(rootDir, workspace, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  pkg.version = version;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Updated ${workspace}/package.json to v${version}`);
}

console.log(`All workspaces synced to v${version}`);
