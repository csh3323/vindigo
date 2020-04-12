import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';

/**
 * Lists are contained with boards, and group
 * related tasks together in an ordered fashion.
 */
export class ListModel extends Model {

	static get tableName() {
		return prefixTable('lists');
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

}