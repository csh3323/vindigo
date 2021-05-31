import { Knex } from 'knex';

exports.up = async ({ schema, fn }: Knex) => {
	return schema.createTable('users', function(table) {
		table.increments();
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.timestamp('created_at').defaultTo(fn.now());
		table.timestamp('updated_at').defaultTo(fn.now());
	});
};

exports.down = async ({ schema }: Knex) => {
	return schema.dropTable('users');
};