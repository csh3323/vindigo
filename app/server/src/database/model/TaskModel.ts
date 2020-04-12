import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';

/**
 * Tasks are the most important part of Teleboard
 * and represent a single card in a board. Tasks
 * are ordered within lists, and lists are ordered
 * within boards.
 */
export class TaskModel extends Model {

	static get tableName() {
		return prefixTable('tasks');
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'name',
				'description',
				'order_number',
				'owner_list'
			],
			properties: {
				task_id: { type: 'integer' },
				name: { type: 'string' },
				description: { type: 'string' },
				order_number: { type: 'integer' },
        		owner_list: { type: 'integer' }
			}
		}
	}

}