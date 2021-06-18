import { Knex } from 'knex';

exports.up = async ({ schema }: Knex) => {
	return schema.createTable('users', (table) => {
		table.increments();
		table.string('username').notNullable();
		table.string('password').notNullable();
		table.string('email').notNullable();
		table.string('bio').notNullable();
		table.string('name').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('last_seen_at').notNullable();
		table.boolean('is_enabled').notNullable().defaultTo(true);
		table.string('role').notNullable().defaultTo('guest');
		table.string('language').notNullable().defaultTo('en-US');
	});
};

exports.down = async ({ schema }: Knex) => {
	return schema.dropTable('users');
};