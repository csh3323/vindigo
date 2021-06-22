import { Knex } from 'knex';

exports.up = async function({schema}: Knex) {
	return schema.createTable('sessions', (table) => {
		table.string('id');
		table.bigInteger('expired_at');
		table.text('json');
	});
};

exports.down = async function({schema}: Knex) {
	return schema.dropTable('sessions');
};