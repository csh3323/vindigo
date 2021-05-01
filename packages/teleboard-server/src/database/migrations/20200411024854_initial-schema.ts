import Knex from 'knex';
import { prefixTable } from '../DatabaseService';

const USERS_TABLE = prefixTable('users');
const BOARDS_TABLE = prefixTable('boards');
const LISTS_TABLE = prefixTable('lists');
const TASKS_TABLE = prefixTable('tasks');

exports.up = function(knex: Knex) {
	return knex.schema

		// User accounts table
		.createTable(USERS_TABLE, (table) => {
			table.increments('user_id');
			table.string('email');
			table.string('username');
			table.string('role');
			table.boolean('disabled');
			table.string('password');
			table.string('password_salt');
			table.timestamp('last_login_at');
			table.timestamps();
		})
		
		// Boards table
		.createTable(BOARDS_TABLE, (table) => {
			table.increments('board_id');
			table.integer('author');
			table.string('name');
			table.boolean('closed');
			table.timestamps();

			table.foreign('author').references('user_id').inTable(USERS_TABLE);
		})
		
		// Lists table
		.createTable(LISTS_TABLE, (table) => {
			table.increments('list_id');
			table.integer('order_number');
			table.integer('owner_board');
			table.string('name');

			table.foreign('owner_board').references('board_id').inTable(BOARDS_TABLE);
		})

		// Tasks table
		.createTable(TASKS_TABLE, (table) => {
			table.increments('task_id');
			table.integer('order_number');
			table.integer('owner_list');
			table.string('name');
			table.text('description');
			
			table.foreign('owner_list').references('list_id').inTable(LISTS_TABLE);
		});
};

exports.down = function(knex: Knex) {
	return knex.schema
		.dropTable(USERS_TABLE)
		.dropTable(BOARDS_TABLE)
		.dropTable(LISTS_TABLE)
		.dropTable(TASKS_TABLE);
};
