import Knex from 'knex';
import { prefixTable } from '../DatabaseService';

const USERS_TABLE = prefixTable('users');

exports.up = function(knex: Knex) {
	return knex.schema.createTable(USERS_TABLE, (table) => {
		table.increments('uid').unsigned().primary();
		table.string('email');
		table.string('username');
		table.string('role');
		table.boolean('active');
	});
};

exports.down = function(knex: Knex) {
	return knex.schema.dropTable(USERS_TABLE);
};
