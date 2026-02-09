# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.8](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.7...v0.0.8) (2026-02-09)


### Features

* add basic content to home page ([daebdf2](https://github.com/Andreas-Menzel/application-patient-care/commit/daebdf2b0399bce57f49ddda00a4bc1879de02da)), closes [#12](https://github.com/Andreas-Menzel/application-patient-care/issues/12)
* change page title and favicon ([3b641ac](https://github.com/Andreas-Menzel/application-patient-care/commit/3b641ac6274f9fb7abcfcd13df23f29e149d93aa)), closes [#11](https://github.com/Andreas-Menzel/application-patient-care/issues/11)

### [0.0.7](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.6...v0.0.7) (2026-02-09)


### Features

* add logging ([1460ed2](https://github.com/Andreas-Menzel/application-patient-care/commit/1460ed2c9371bc4775e7df3e9d28f342cb4222cc)), closes [#1](https://github.com/Andreas-Menzel/application-patient-care/issues/1)


### Bug Fixes

* show error in frontend ([2de39f7](https://github.com/Andreas-Menzel/application-patient-care/commit/2de39f758b2c03afeedaf03314dfd6cdbc8f79fb)), closes [#10](https://github.com/Andreas-Menzel/application-patient-care/issues/10)

### [0.0.6](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.5...v0.0.6) (2026-02-08)


### Features

* add birth date to patient ([9e7148d](https://github.com/Andreas-Menzel/application-patient-care/commit/9e7148d8cfa49a54a859955611f60ee3fc8499ea))
* add salutation and update gender ([ec500a8](https://github.com/Andreas-Menzel/application-patient-care/commit/ec500a8a5b32f62c371c65894a4d80fa38975a63))
* Remove actions column on /patients page ([addd2bc](https://github.com/Andreas-Menzel/application-patient-care/commit/addd2bc9f13ffcb07a7edce90da331d12fbf294d))
* rename discard button to cancel ([f246dab](https://github.com/Andreas-Menzel/application-patient-care/commit/f246daba895db5e99197ee546cdd4d010bdbe89f))


### Bug Fixes

* add statement breakpoints to db migrations ([6fa7b3d](https://github.com/Andreas-Menzel/application-patient-care/commit/6fa7b3d2aa0f1951c6c0b681ef405a3b3463c1f4))


### Build System

* fix npm run dev ([b307e07](https://github.com/Andreas-Menzel/application-patient-care/commit/b307e07cdb130c0d293c9c527346822bd28d2a90))
* fix npm run dev ([d943d9d](https://github.com/Andreas-Menzel/application-patient-care/commit/d943d9df6e114b21567df846c27bbe406f0f8f6e))

### [0.0.5](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.4...v0.0.5) (2026-02-08)


### Features

* auto-migrate db on startup ([7449a33](https://github.com/Andreas-Menzel/application-patient-care/commit/7449a335adad730e16b7dd30a4ff9521e39e907d))

### [0.0.4](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.3...v0.0.4) (2026-02-08)


### Bug Fixes

* fix baseUrl ([674a12b](https://github.com/Andreas-Menzel/application-patient-care/commit/674a12b94350607aeaf50b718c75205f252e1244))

### [0.0.3](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.2...v0.0.3) (2026-02-08)

### [0.0.2](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.1...v0.0.2) (2026-02-08)


### Bug Fixes

* auto-commit version changes in package.json ([9a699fa](https://github.com/Andreas-Menzel/application-patient-care/commit/9a699fa7db2ccd48b183053a7fd7f7152d44b84c))

### [0.0.1](https://github.com/Andreas-Menzel/application-patient-care/compare/v0.0.0...v0.0.1) (2026-02-08)


### Build System

* add deploy script and show version number in footer ([f20a4dd](https://github.com/Andreas-Menzel/application-patient-care/commit/f20a4ddae92821d25b2f34b9efa1dac03408f0be)), closes [#7](https://github.com/Andreas-Menzel/application-patient-care/issues/7)

## 0.0.0 (2026-02-08)


### Features

* add api contract ([86f077b](https://github.com/Andreas-Menzel/application-patient-care/commit/86f077bdf8926f13c19f7c5b969a08615ec8c715))
* add email and phone numbers to schemas and db ([f118bb1](https://github.com/Andreas-Menzel/application-patient-care/commit/f118bb15f27c765f5615240ee42c0158d45f80f2))
* add patient create and delete to frontent ([ea02742](https://github.com/Andreas-Menzel/application-patient-care/commit/ea0274258e0a6456f74d9e8460abda8a3685ba2b))
* add sqlite connection and missing crud operations for patient data ([37bb66d](https://github.com/Andreas-Menzel/application-patient-care/commit/37bb66d19de776d5e8607b4e703a9d4537ac5e66)), closes [#2](https://github.com/Andreas-Menzel/application-patient-care/issues/2) [#3](https://github.com/Andreas-Menzel/application-patient-care/issues/3)
* added mockup for /patients and /patient/:id ([1fa168a](https://github.com/Andreas-Menzel/application-patient-care/commit/1fa168a6a181a94c449619331f33425972c077b3)), closes [#6](https://github.com/Andreas-Menzel/application-patient-care/issues/6)
* create version tags from commit history ([1e14a2c](https://github.com/Andreas-Menzel/application-patient-care/commit/1e14a2c59f7ce2d194483be4f6cdbf01759ef3dd))
* load and show real data instead of sample data ([feea6c0](https://github.com/Andreas-Menzel/application-patient-care/commit/feea6c0a8ed344ed0cb887742844c5f597130ada))
* move all enpoints to /api and fetch patients in frontend ([b6ca0fa](https://github.com/Andreas-Menzel/application-patient-care/commit/b6ca0fa411ee682ca28a73a2b700c09dc526c2f1))
* set up basic frontend+backend ([b770f71](https://github.com/Andreas-Menzel/application-patient-care/commit/b770f711b0c6f1ab67630d04122ad07ba8f0c9a3))


### Bug Fixes

* add missing await in updatePatient route handler ([58021b2](https://github.com/Andreas-Menzel/application-patient-care/commit/58021b293f19a265ad0728b918b0174993e00a73))
* defined noBody for delete endpoint ([20f99e1](https://github.com/Andreas-Menzel/application-patient-care/commit/20f99e19e1d1d7685435c271f4b6584de67620b9))
* fix order of workspace definitions ([876575e](https://github.com/Andreas-Menzel/application-patient-care/commit/876575e26e15986ccb0ed0f1616b2c5fa945dbf2))
* remove horizontal scrollbar (always on) ([f893bdb](https://github.com/Andreas-Menzel/application-patient-care/commit/f893bdb3c7b22235bf9dc7744490ff74339ebeef))


### Build System

* add docker setup with caddy ([f55f54e](https://github.com/Andreas-Menzel/application-patient-care/commit/f55f54effd9123af2fe1378d5eebcf16f2e5ea17)), closes [#4](https://github.com/Andreas-Menzel/application-patient-care/issues/4) [#7](https://github.com/Andreas-Menzel/application-patient-care/issues/7)
* specify domain in Caddy setup ([53bc3f8](https://github.com/Andreas-Menzel/application-patient-care/commit/53bc3f83bab0a33312ee289a193c205236378654))
