import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';
import { BaseModel } from './BaseModel';

/**
 * Tasks are the most important part of Teleboard
 * and represent a single card in a board. Tasks
 * are ordered within lists, and lists are ordered
 * within boards.
 * 
 * TODO Replace schema with typed properties
 */
export class TaskModel extends BaseModel {

	static get tableName() {
		return prefixTable('tasks');
	}

	static get idColumn() {
		return 'task_id';
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