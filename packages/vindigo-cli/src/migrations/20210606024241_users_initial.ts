import { Knex } from 'knex';

exports.up = async ({ schema, fn }: Knex) => {

	return schema.createTable('users', function(table) {
		table.increments();
		table.string('username').notNullable();
		table.string('password').notNullable();
		table.string('salt', 7).notNullable();
		table.string('email').notNullable();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.timestamp('created_at').defaultTo(fn.now());
		table.timestamp('updated_at').defaultTo(fn.now());
	});
};

exports.down = async ({ schema }: Knex) => {
	return schema.dropTable('users');
};