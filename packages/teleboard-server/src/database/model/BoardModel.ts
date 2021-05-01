import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';
import { ListModel } from './ListModel';
import { BaseModel } from './BaseModel';
import { UserModel } from './UserModel';

/**
 * Boards are the top level structural entity
 * of Teleboard. Boards contain lists, which
 * in return contain tasks.
 */
export class BoardModel extends BaseModel {

	public board_id!: number;
	public name!: string;
	public closed!: boolean;
	public author!: number;
	public created_at!: any;
	public updated_at!: any;

	static get tableName() {
		return prefixTable('boards');
	}

	static get idColumn() {
		return 'board_id';
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
			},
			author: {
				relation: Model.HasOneRelation,
				modelClass: UserModel,
				join: {
					from: `${this.tableName}.author`,
					to: `${UserModel.tableName}.${UserModel.idColumn}`
				}
			}
		}
	}

}