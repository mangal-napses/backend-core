- [1. Introduction](#1-introduction)
- [2. Pre-requirement](#2-pre-requirement)
- [3. Running the project](#3-running-the-project)
- [4. Connect to container](#4-connect-to-container)
- [5. Db operations](#5-db-operations)
- [6. Test Cases](#6-test-cases)
- [7. Health check apis](#7-health-check-apis)
- [8. Cron](#8-cron)
    - [cron](#cron)
    - [cronitor](#cronitor)
- [9. Authors/maintainers/contributors](#9-authorsmaintainerscontributors)

## 1. Introduction

It's backend project build on nodejs. which can be used as a reference/based for new/existing project.

## 2. Pre-requirement

- Ubuntu 20.04.4 LTS
- docker(19.xx)
- docker-compose(1.28.xx)

## 3. Running the project

```
docker-compose up

```

## 4. Connect to container

To perform db operations, installing new packages and running test cases. You need to connect to the container.
use below cmd to connect.

```
./connect.sh
```

## 5. Db operations

To perform db operations connect to the container and execute below commends

```
Commands:
  npm run db:create  --env=env                         Create database specified by configuration
  npm run db:migrate --env=env                         Run pending migrations
  npm run db:migrate:undo --env=env                    Reverts a migration
  npm run db:drop --env=env                            Drop database specified by configuration(make sure all connections are closed)

```

## 6. Test Cases

To execute test cases connect to the container and execute below commends

```
npm run test:watch                            Run all the test cases and wait for the changes
npm run test                                  Run all the test cases and exit

```

## 7. Health check apis

Project contain two health-check api end-points.

```
/health-check-api                            To check the health of api instance.
/health-check-db                             To check the connection between api instance and db.

```
Note: check index.js for code implementation.

## 8. Cron

For cron related works, Project use cron package for running your code and cronitor package to monitoring your cron.

#### cron

cron installation `npm i cron`

How to use : <https://www.npmjs.com/package/cron>

#### cronitor

Pre-requirement: Create account in cronitor portal (<https://cronitor.io/>)

cronitor installation `npm i cronitor`

How to use <https://github.com/cronitorio/cronitor-js>

## 9. Authors/maintainers/contributors

- Yashjeet Luthra (yash@napses.com)
- Hitesh Bhati (hitesh.bhati@napses.com)
