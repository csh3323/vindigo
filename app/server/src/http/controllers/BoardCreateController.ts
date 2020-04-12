import { Request, Response } from "express";
import { Schema } from "../../schema/Schema";
import { Controller } from "../Controller";
import { BoardModel } from "../../database/model/BoardModel";
import { AuthorizeContext, HandlerContext } from "../Context";

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
	
	async authorize(_req: Request, _ctx: AuthorizeContext) {
		return true;
	}

	async handle(req: Request, _res: Response, ctx: HandlerContext) {
		const currDate = new Date();
		const result = await BoardModel.query().insertAndFetch({
			name: req.body.name,
			author: ctx.user!.user_id,
			closed: false,
			created_at: currDate,
			updated_at: currDate
		});

		ctx.respond({
			id: result.board_id
		});
	}

}