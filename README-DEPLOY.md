# README - Deploy

The project contains a docker and caddy setup. This allows for easy deployment:

1. Modify the `Caddyfile` to use the correct domain name
2. Copy the `.env.example` to `.env` and fill in the missing fields
3. Run `npm run deploy`. This will:
   - Create a new version tag (depending on the latest changes/commits)
   - Update the `CHANGELOG.md` file
   - Connect to the server specified in the `.env` file, pull the changes,
     build the new docker container, add a version tag to the new image, stop
     the old container and start the new one

Done!
