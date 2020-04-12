import { Model } from 'objection';
import { prefixTable } from '../DatabaseService';
import { ListModel } from './ListModel';
import { BaseModel } from './BaseModel';

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
			}
		}
	}

}