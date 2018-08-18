# Apollo GraphQL + InversifyJS + Typescript :rocket:

## Prerequisites

You'll need to install [Docker on your Mac](https://docs.docker.com/docker-for-mac/install/)

## Getting Started

To get started, clone the repository:

```sh
git@github.com:dialexa/apollo-inversify-typescript.git
```

Navigate to the directory on your machine and install the NodeJS modules (with yarn :raised_hands:):

```sh
yarn install
```

Then, build/rebuild the environment by running the following command:

```sh
yarn run rebuild
```

This will:

* Kill & remove all Docker containers :skull:
* Download the Docker images :white_check_mark:
* Migrate the Postgres database to the latest schema :boom:
* Populate the database with seed data :seedling:
* Create a test database :100:
* Migrate the test database to the latest schema :fire:
* Start up the API & Postgres servers :tada:

**Note:** The API & Postgres servers are started up in the background :thumbsup:

## Playing w/ the API

To play around with the API, after rebuilding your environment go to [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Running Tests

Some tests have been included in this repository to serve as an example.  To run the tests, execute:

```sh
yarn test
```

## Resources

* [ExpressJS](https://expressjs.com)
* [InversifyJS](https://github.com/inversify/InversifyJS)
* [Apollo GraphQL Server](https://www.apollographql.com/)
* [Apollo Errors](https://www.npmjs.com/package/apollo-errors)
* [Apollo Resolvers](https://www.npmjs.com/package/apollo-resolvers)
* [GraphQL Playground](https://github.com/prisma/graphql-playground)
