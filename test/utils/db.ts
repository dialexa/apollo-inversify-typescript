import * as Knex from 'knex';
// tslint:disable-next-line
const knexfile = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const configuration = knexfile[environment];

const knex = Knex(configuration);

export default {
  async clear () {
    const blacklist = ['knex_migrations', 'knex_migrations_lock'];

    const result = await knex.raw('SELECT tablename FROM pg_tables WHERE schemaname=\'public\'');
    const tables = result.rows.map(t => t.tablename).filter(t => blacklist.indexOf(t) < 0);

    await knex.raw(`TRUNCATE ${tables.join(',')} CASCADE`);
  },
  knex
}
