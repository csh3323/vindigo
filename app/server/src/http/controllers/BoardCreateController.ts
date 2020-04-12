import { Request, Response } from "express";
import { Schema } from "../../schema/Schema";
import { Controller } from "../Controller";
import { TeleboardServer } from "../../bootstrap/TeleboardServer";
import { UserModel } from "../../database/model/UserModel";
import { BoardModel } from "../../database/model/BoardModel";

/**
 * Create a new empty board 
 */
export class BoardCreateController implements Controller {

	schema(): Schema {
		return Schema.of('BoardCreateSchema', {
			type: 'object',
			required: ['name'],
			properties: {
				name: {
					type: 'string'
				}
			}
		});
	}
	
	async authorize(app: TeleboardServer, req: Request, user?: UserModel) {
		return true;
	}

	async handle(app: TeleboardServer, req: Request, res: Response, user?: UserModel) {
		const name = req.body.name;

		const value = await BoardModel.query().findById(1)

		res.send(JSON.stringify(value));

		// BoardModel.query().insertAndFetch({
		// 	name: req.body.name,
		// })
	}

}