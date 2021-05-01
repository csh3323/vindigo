import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';
import { BaseModel } from './BaseModel';

/**
 * Represents a registered Teleboard user account
 */
export class UserModel extends BaseModel {

	public user_id!: number;
	public email!: string;
	public username!: string;
	public role!: string;
	public disabled!: boolean;
	public password!: string;
	public password_salt!: string;
	public last_login_at!: any;
	public created_at!: any;
	public updated_at!: any;

	static get tableName() {
		return prefixTable('users');
	}

	static get idColumn() {
		return 'user_id';
	}

}