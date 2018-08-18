import * as Knex from 'knex';

const config = require('../knexfile');

const { connection: { database } } = config;
delete config.connection.database;

const knex = Knex(config);
knex.raw(`CREATE DATABASE ${database}`).finally(() => knex.destroy());
