# README - Planned Features

## Access Control

Currently, all data is publicly available. Add authentication
(e.g., session-based bearer tokens or oauth-based login).

## Improved `/patients` endpoint

Add pagination. Return:

- current page
- number of results on this page
- number of pages available
- data: patients (as usual)

Add proper filtering. E.g. basic filter by patient name.

## Delayed data deletion / Anonymization

Research whether we should/are allowed to mark a patient as `deleted` and
delete the dataset at a later time.

Alternative: Remove all PIIs instead of deleting the entry in the database.
Why?: This will not break foreign-key constraints in the database.
This may require additional logic on what to delete and what to anonymize.

## Encryption at rest

The caddy setup ensures encryption at transport. Since we are managing patient
data, which includes highly personalized data, possibly including medical
records, we should think about encryption of the data in the database.

## Separate staging server

We currently only have one environment for testing: local. We should create
a staging server to test all features on a server with a domain, etc.

- Add staging variables to `.env` and `.env.example`
- Extend the `scripts/deploy.sh` script to allow for --staging, or
  better: --production

We could use `https://staging.patient-management.de` as the staging server and
`https://patient-management.de` as the production server.
