import { Request, Response } from "express";
import { Schema } from "../../schema/Schema";
import { Controller } from "../Controller";
import { BoardModel } from "../../database/model/BoardModel";
import { AuthorizeContext, HandlerContext } from "../Context";

/**
 * Returns all boards the user has access to
 */
export class BoardListController implements Controller {

	schema(): Schema {
		return Schema.of('BoardCreateSchema', {
			type: 'object'
		});
	}
	
	async authorize(_req: Request, _ctx: AuthorizeContext) {
		return true;
	}

	async handle(_req: Request, _res: Response, ctx: HandlerContext) {
		const result = await BoardModel.query();

		ctx.respond({
			boards: result
		});
	}

}