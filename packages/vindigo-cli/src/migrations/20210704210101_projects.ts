import { Knex } from 'knex';

exports.up = async function({schema}: Knex) {
	return schema
		.createTable('projects', (table) => {
			table.increments();
			table.string('name');
			table.text('description');
			table.text('cover_image');
			table.text('background_image');
			table.integer('creator_id');
			table.boolean('is_visible');
			table.boolean('is_closed');
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
		.createTable('project_members', (table) => {
			table.increments();
			table.integer('user_id');
			table.integer('project_id');
			table.string('access_level');

			// Define relations
			table.foreign('user_id').references('users.id').onDelete('CASCADE');
			table.foreign('project_id').references('projects.id').onDelete('CASCADE');
		})
		.createTable('project_teams', (table) => {
			table.increments();
			table.integer('team_id');
			table.integer('project_id');
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
		.dropTable('project_members')
		.dropTable('project_teams');
};