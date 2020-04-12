import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';
import { ListModel } from './ListModel';

/**
 * Boards are the top level structural entity
 * of Teleboard. Boards contain lists, which
 * in return contain tasks.
 */
export class BoardModel extends Model {

	static get tableName() {
		return prefixTable('boards');
	}

	static get idColumn() {
		return 'board_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'name',
				'order_number',
				'author',
				'closed'
			],
			properties: {
				board_id: { type: 'integer' },
				name: { type: 'string' },
				order_number: { type: 'integer' },
        		closed: { type: 'boolean' },
				author: { type: 'integer' }
			}
		}
	}

	static get relationMappings() {
		return {
			lists: {
				relation: Model.HasManyRelation,
				modelClass: ListModel,
				join: {
					from: `${this.tableName}.${this.idColumn}`,
					to: `${ListModel.tableName}.owner_board`
				}
			}
		}
	}

}