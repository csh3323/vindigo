import { Request, Response } from "express";
import { Schema } from "../../schema/Schema";
import { Controller } from "../Controller";
import { TeleboardServer } from "../../bootstrap/TeleboardServer";
import { UserModel } from "../../database/model/UserModel";
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
	
	async authorize(req: Request, ctx: AuthorizeContext) {
		return true;
	}

	async handle(req: Request, res: Response, ctx: HandlerContext) {
		const result = await BoardModel.query().insertAndFetch({
			name: req.body.name,
			author: ctx.user!.user_id,
			closed: false
		});

		ctx.respond({
			id: result.board_id
		});
	}

}