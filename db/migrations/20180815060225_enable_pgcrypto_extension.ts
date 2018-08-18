import * as Knex from "knex";

exports.up = async (knex: Knex): Promise<void> =>
  knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

exports.down = async (knex: Knex): Promise<any> =>
  knex.raw('DROP EXTENSION IF NOT EXISTS "pgcrypto"')
