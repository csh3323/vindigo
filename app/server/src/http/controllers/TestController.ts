import { Request, Response } from "express";
import { Schema } from "../../schema/Schema";
import { Controller } from "../Controller";
import { TeleboardServer } from "../../bootstrap/TeleboardServer";
import { UserModel } from "../../database/model/UserModel";

/**
 * Simple test controller used to test the backend API
 */
export class TestController implements Controller {

	schema(): Schema {
		return Schema.of('TestSchema', {
			type: 'object',
			required: ['firstName', 'lastName'],
			properties: {
				firstName: {
					type: 'string'
				},
				lastName: {
					type: 'string'
				}
			}
		});
	}
	
	async authorize(app: TeleboardServer, req: Request, user?: UserModel) {
		return true;
	}

	async handle(app: TeleboardServer, req: Request, res: Response, user?: UserModel) {
		res.send("Hello World! 🔭 " + JSON.stringify(req.body));

		res.json(await UserModel.query())
	}

}