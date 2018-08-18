import * as Knex from "knex";

exports.up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    table.string('email').notNullable().unique();
    table.string('username').notNullable().unique();

    table.binary('secret').notNullable();
    table.binary('salt').notNullable();

    table.timestamp('created_at').notNullable().defaultTo('NOW()');
    table.timestamp('updated_at').nullable();
  });

exports.down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('users');
