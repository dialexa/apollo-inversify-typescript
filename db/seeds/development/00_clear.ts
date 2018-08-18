import * as Knex from "knex";

exports.seed = async (knex: Knex): Promise<void> => {
  const blacklist = ['knex_migrations', 'knex_migrations_lock'];

  const result = await knex.raw('SELECT tablename FROM pg_tables WHERE schemaname=\'public\'');
  const tables = result.rows.map(t => t.tablename).filter(t => blacklist.indexOf(t) < 0);

  await knex.raw(`TRUNCATE ${tables.join(',')} CASCADE`);
};
