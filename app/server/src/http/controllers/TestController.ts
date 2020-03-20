import { Request, Response } from "express";
import { Schema } from "../../schema/Schema";
import { UserProfile } from "../../auth/UserProfile";
import { Controller } from "../Controller";
import { TelescopeServer } from "../../bootstrap/TelescopeServer";

/**
 * Simple test controller used to test the backend API
 */
export class TestController implements Controller {

	authorize(app: TelescopeServer, req: Request, user?: UserProfile): boolean {
		console.log(app.logger.info('yeetus'));
		
		return Math.random() > 0.5;
	}

	schema(): Schema {
		return Schema.of('TestSchema', {
			type: 'object',
			required: ['test'],
			properties: {
				test: {
					type: 'string'
				}
			}
		});
	}

	handle(app: TelescopeServer, req: Request, res: Response, user?: UserProfile): void {
		res.send("Hello World! 🔭 " + JSON.stringify(req.body));
	}

}