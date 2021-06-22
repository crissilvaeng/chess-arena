# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.1](https://github.com/yifan-ca/chess-arena/compare/v1.0.0...v1.0.1) (2021-06-22)


### Features

* 🔒️ removes auth from GET /api/games endpoint ([395155e](https://github.com/yifan-ca/chess-arena/commit/395155ef3d9d57e2af537de1c340dbdc5d54803f))


### Bug Fixes

* :bug: allow same engine playing diff games ([600d4f4](https://github.com/yifan-ca/chess-arena/commit/600d4f42375ff2be9ec62b7a767ba4d35edfe3e5))
* 🚑️ remvove game id from players' queue name and routing key ([36b5652](https://github.com/yifan-ca/chess-arena/commit/36b56522603749ad9274ca2643ebce59b267c4dd))

## [1.0.0](https://github.com/yifan-ca/chess-arena/compare/v0.5.0...v1.0.0) (2021-06-22)


### Features

* ♻️ publish events in NATS ([d4a8fa6](https://github.com/yifan-ca/chess-arena/commit/d4a8fa65e5fc2b9319fdf8e41d222078f9a00e8b))
* ✨ adds outcome like py chess when game finish ([b754750](https://github.com/yifan-ca/chess-arena/commit/b754750aba2f4b320433654332e1b5db25cbd783))
* ✨ destroy containers after game over ([b1d5fc8](https://github.com/yifan-ca/chess-arena/commit/b1d5fc826c045e7cbfbaad073d43b840bb5654bd))
* ✨ engines competion vi rabbitmq (with settings) ([debc5b2](https://github.com/yifan-ca/chess-arena/commit/debc5b257d2485c54eea6b4600715b4079bb7198))


### Bug Fixes

* :lock: enable Authorization header in CORS configs + auth bearer ([3aab989](https://github.com/yifan-ca/chess-arena/commit/3aab989f90330dd8ee6fb6e8877ed6ef81ffa35f))
* 🔒️ decode header form base64 instead envvar ([2535092](https://github.com/yifan-ca/chess-arena/commit/25350923a818d4369e9a07febcf60b2f1189e2b7))
* 🔧 adds AMQP_SERVICE to CD workflow ([d158d35](https://github.com/yifan-ca/chess-arena/commit/d158d35cd56067fa18edfcf9c2bce6ef167b7cdc))

## [0.5.0](https://github.com/yifan-ca/chess-arena/compare/v0.4.0...v0.5.0) (2021-06-22)


### Features

* 💚 adds CHECKS file to Dokku deploy ([259c2bb](https://github.com/yifan-ca/chess-arena/commit/259c2bb62603e01521650a1682cd78248dac6a49))
* 🚀 adds apps.json and Procfile to deploy in Dokku PAAS ([225d0eb](https://github.com/yifan-ca/chess-arena/commit/225d0eb904bf96c7df9c4c71972bc3e51fbc2d29))

## [0.4.0](https://github.com/crissilvaeng/chess-arena/compare/v0.3.0...v0.4.0) (2021-06-22)


### Features

* :sparkles: changes moves between players using rabbit ([e4fb988](https://github.com/crissilvaeng/chess-arena/commit/e4fb9882bcb809d42db5dc7c7dde041e7a150602))
* **player:** :sparkles: save container id to post use ([2380d92](https://github.com/crissilvaeng/chess-arena/commit/2380d9262f3bc49605c3d72224782ebb9b1d68c7))


### Bug Fixes

* :bug: enable start container in a dettach mode ([ddccbb1](https://github.com/crissilvaeng/chess-arena/commit/ddccbb1fbc3e55197d14ed174e91237cf2531289))
* **docker:** 🐛 await util pull is complete before run engine ([de82ed2](https://github.com/crissilvaeng/chess-arena/commit/de82ed27ff42a20c6c9ad3bd68a305ef7eeaaa9a))

## [0.3.0](https://github.com/crissilvaeng/chess-arena/compare/v0.2.0...v0.3.0) (2021-06-17)


### Features

* **auth:** 🛂 adds validation against static api key ([b0fec54](https://github.com/crissilvaeng/chess-arena/commit/b0fec547a39f4e656789d748ff3ea47ff18adfb3))

## [0.2.0](https://github.com/crissilvaeng/chess-arena/compare/v0.1.0...v0.2.0) (2021-06-17)


### Features

* **docker:** ✨ adds engine pull/run on game created event using saga ([1ce615d](https://github.com/crissilvaeng/chess-arena/commit/1ce615d6b4d9d7fc378ff1c3ae9819cfff7df1d9))

## [0.1.0](https://github.com/crissilvaeng/chess-arena/compare/v0.0.1...v0.1.0) (2021-06-17)


### Features

* **api:** :zap: adds a base game model to database ([b9ed62d](https://github.com/crissilvaeng/chess-arena/commit/b9ed62d426562d0b838e69eed402f73830b410e7))
* **api:** 🎨 rewrite post function using cqrs module ([7691017](https://github.com/crissilvaeng/chess-arena/commit/769101784379fbf4fef00aa01e70a8144cf590c0))

### 0.0.1 (2021-06-17)


### Features

* **api:** :construction: adds nestjs boilerplate project d47d5cc
* **docker:** ✨ adds docker module and health check with dockerode b8da01b
* **mongo:** 🚧 adds mongo database and healthcheck 62615e8
* **nats:** 🚧 adds nats microservices and healthcheck b8dbc13
* **rabbitmq:** 🚧 adds rabbitmq microservices and healthcheck 871c20b
* **redis:** 🚧 adds redis microservices and healthcheck 8796c3f
* 📈 adds healthcheck endpoint 6e7cfcd
