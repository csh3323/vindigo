import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';

/**
 * Represents a registered Teleboard user account
 */
export class UserModel extends Model {

	static get tableName() {
		return prefixTable('profiles');
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'firstName',
				'lastName',
				'email'
			],
			properties: {
				id: { type: 'integer' },
				firstName: { type: 'string', minLength: 1, maxLength: 64 },
        		lastName: { type: 'string', minLength: 1, maxLength: 64 },
				email: { type: 'string' }
			}
		}
	}

}