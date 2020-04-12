import Knex from 'knex';
import {getTablePrefix} from '../DatabaseService';

const USERS_TABLE = getTablePrefix('users');

exports.up = function(knex: Knex) {
	return knex.schema.createTable(USERS_TABLE, (table) => {
		table.increments('uid').primary();
		table.string('email');
		table.string('username');
		table.string('role');
		table.boolean('active');
	});
};

exports.down = function(knex: Knex) {
	return knex.schema.dropTable(USERS_TABLE);
};
