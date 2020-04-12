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
			table.increments('user_id').unsigned();
			table.string('email');
			table.string('username');
			table.string('role');
			table.boolean('active');
			table.timestamps();
		})
		
		// Boards table
		.createTable(BOARDS_TABLE, (table) => {
			table.increments('board_id').unsigned();
			table.integer('author').unsigned();
			table.string('name');
			table.boolean('closed');
			table.timestamps();

			table.foreign('author').references('user_id').inTable(USERS_TABLE);
		})
		
		// Lists table
		.createTable(LISTS_TABLE, (table) => {
			table.increments('list_id').unsigned();
			table.integer('order_number').unsigned();
			table.integer('owner_board').unsigned();
			table.string('name');

			table.foreign('owner_board').references('board_id').inTable(BOARDS_TABLE);
		})

		// Tasks table
		.createTable(TASKS_TABLE, (table) => {
			table.increments('task_id').unsigned();
			table.integer('order_number').unsigned();
			table.integer('owner_list').unsigned();
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
