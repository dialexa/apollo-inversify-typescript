import * as Knex from "knex";

exports.up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('auth_tokens', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');

    table.string('token').notNullable().unique();

    table.timestamp('created_at').notNullable().defaultTo('NOW()');
    table.timestamp('expires_at').notNullable();
  });

exports.down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('auth_tokens');
