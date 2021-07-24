import { Knex } from 'knex';

exports.up = async function({schema}: Knex) {
	return schema
		.createTable('projects', (table) => {
			table.increments();
			table.string('name');
			table.text('description');
			table.text('cover_image');
			table.text('background_image');
			table.integer('creator_id').unsigned().notNullable();
			table.boolean('is_visible');
			table.boolean('is_closed');
			table.boolean('is_public');
			table.timestamp('created_at');
			table.timestamp('last_modified_at');

			// Define relations
			table.foreign('creator_id').references('users.id').onDelete('CASCADE');
		})
		.createTable('teams', (table) => {
			table.increments();
			table.string('name');
			table.text('description');
			table.text('logo_image');
			table.timestamp('created_at');
		})
		.createTable('tasks', (table) => {
			table.increments();
			table.timestamp('created_at');
			table.timestamp('last_modified_at');
			table.string('summary');
			table.text('description');
		})
		.createTable('child_tasks', (table) => {
			table.increments();
			table.integer('parent_task').unsigned().notNullable();
			table.integer('child_task').unsigned().notNullable();

			// Define relations
			table.foreign('parent_task').references('tasks.id').onDelete('CASCADE');
			table.foreign('child_task').references('tasks.id').onDelete('CASCADE');
		})
		.createTable('project_members', (table) => {
			table.increments();
			table.integer('user_id').unsigned().notNullable();
			table.integer('project_id').unsigned().notNullable();
			table.string('access_level');

			// Define relations
			table.foreign('user_id').references('users.id').onDelete('CASCADE');
			table.foreign('project_id').references('projects.id').onDelete('CASCADE');
		})
		.createTable('project_teams', (table) => {
			table.increments();
			table.integer('team_id').unsigned().notNullable();
			table.integer('project_id').unsigned().notNullable();
			table.string('access_level');

			// Define relations
			table.foreign('team_id').references('teams.id').onDelete('CASCADE');
			table.foreign('project_id').references('projects.id').onDelete('CASCADE');
		});
};

exports.down = async function({schema}: Knex) {
	return schema
		.dropTable('projects')
		.dropTable('teams')
		.dropTable('tasks')
		.dropTable('child_tasks')
		.dropTable('project_members')
		.dropTable('project_teams');
};