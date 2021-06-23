import { Knex } from 'knex';

exports.up = async ({ schema }: Knex) => {
	return schema.createTable('users', (table) => {
		table.increments();
		table.string('username').notNullable();
		table.string('email').notNullable();
		table.string('password');
		table.string('bio');
		table.string('name').notNullable();
		table.string('role').notNullable();
		table.string('language').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('last_seen_at').notNullable();
		table.boolean('is_enabled').notNullable().defaultTo(true);
		table.boolean('is_verified').notNullable().defaultTo(true);
	});
};

exports.down = async ({ schema }: Knex) => {
	return schema.dropTable('users');
};