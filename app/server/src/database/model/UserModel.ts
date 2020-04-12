import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';

/**
 * Represents a registered Teleboard user account
 */
export class UserModel extends Model {

	static get tableName() {
		return prefixTable('users');
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'email',
				'username',
				'role',
				'active'
			],
			properties: {
				user_id: { type: 'integer' },
				email: { type: 'string' },
        		username: { type: 'string' },
				role: { type: 'string' },
				active: { type: 'boolean' }
			}
		}
	}

}