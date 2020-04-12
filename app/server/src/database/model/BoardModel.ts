import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';

/**
 * Boards are the top level structural entity
 * of Teleboard. Boards contain lists, which
 * in return contain tasks.
 */
export class BoardModel extends Model {

	static get tableName() {
		return prefixTable('boards');
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

}