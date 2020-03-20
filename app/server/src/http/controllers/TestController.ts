import { Controller } from "http/Controller";
import { UserProfile } from "auth/User";
import { Request, Response } from "express";
import { Schema } from "schema/Schema";

/**
 * Simple test controller used to test the backend API
 */
export class TestController implements Controller {

	authorize(req: Request, user?: UserProfile): boolean {
		return true;
	}

	schema(): Schema {
		return Schema.of('TestSchema', {
			type: 'object'
		});
	}

	handle(req: Request, res: Response, user?: UserProfile): void {
		res.send("Hello World! " + req.body);
	}

}