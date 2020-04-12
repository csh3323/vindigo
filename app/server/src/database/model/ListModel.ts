import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';
import { TaskModel } from './TaskModel';
import { BaseModel } from './BaseModel';

/**
 * Lists are contained with boards, and group
 * related tasks together in an ordered fashion.
 * 
 * TODO Replace schema with typed properties
 */
export class ListModel extends BaseModel {

	static get tableName() {
		return prefixTable('lists');
	}

	static get idColumn() {
		return 'list_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'name',
				'order_number',
				'owner_board'
			],
			properties: {
				list_id: { type: 'integer' },
				name: { type: 'string' },
				order_number: { type: 'integer' },
        		owner_board: { type: 'integer' }
			}
		}
	}

	static get relationMappings() {
		return {
			tasks: {
				relation: Model.HasManyRelation,
				modelClass: TaskModel,
				join: {
					from: `${this.tableName}.${this.idColumn}`,
					to: `${ListModel.tableName}.owner_list`
				}
			}
		}
	}

}