import { Model } from "objection";

/**
 * Represents a registered Telescope user account
 */
export class UserProfile extends Model {

	static get tableName() {
		return 'profiles';
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