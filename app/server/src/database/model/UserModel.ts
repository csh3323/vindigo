import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';
import { BaseModel } from './BaseModel';

/**
 * Represents a registered Teleboard user account
 */
export class UserModel extends BaseModel {

	static get tableName() {
		return prefixTable('users');
	}

	static get idColumn() {
		return 'user_id';
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