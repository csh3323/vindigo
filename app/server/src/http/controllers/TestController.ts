import { Request, Response } from "express";
import { Schema } from "../../schema/Schema";
import { Controller } from "../Controller";
import { TeleboardServer } from "../../bootstrap/TeleboardServer";
import { UserProfile } from "../../database/model/UserProfile";

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
	
	async authorize(app: TeleboardServer, req: Request, user?: UserProfile) {
		return true;
	}

	async handle(app: TeleboardServer, req: Request, res: Response, user?: UserProfile) {
		res.send("Hello World! 🔭 " + JSON.stringify(req.body));

		await UserProfile.query().insert({
			firstName: 'John',
			lastName: 'Johnson',
			email: 'john@johnson.com'
		});

		res.json(await UserProfile.query())
	}

}