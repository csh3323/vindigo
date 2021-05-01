import { Controller } from "./Controller";
import { RequestHandler } from "express";
import { HttpStatus } from "../common/Statuses";
import { TeleboardServer } from "../bootstrap/TeleboardServer";
import { WebService } from "./WebService";
import { UserModel } from "../database/model/UserModel";

/**
 * Utility function used to build a valid JSON
 * response given the value.
 * 
 * @param value Any value, or error
 * @returns JSON response
 */
function buildJsonResponse(value: any) : any {
	if(value instanceof Error) {
		return {
			success: false,
			error: value.message
		}
	} else {
		return {
			success: true,
			result: value
		}
	}
}

/**
 * Create a connector function that can connect
 * a supplied Controller to an express supported
 * RequestHandler function.
 * 
 * @param web The WebService
 * @returns connector function
 */
export function createConnector(web: WebService) {
	return function connect(controller: Controller) : RequestHandler {
		web.logger.debug('Connecting controller ' + controller.constructor.name)

		return async (req, res) => {
			let user = new UserModel();
			let state = {};

			// TODO Temporarily fake the user
			user.user_id = 0
			user.email = 'unknown@exodius.studio';
			user.username = 'unknown';

			// Authorize the call and respond with 401 Unauthorized
			// when the user is not currently logged in, and with
			// 403 Forbidden when the user lacks permission.
			const isAuthorized = await controller.authorize(req, {
				app: web.app,
				user: user,
				state: state
			});

			if(!isAuthorized) {
				res.sendStatus(user ? HttpStatus.Forbidden : HttpStatus.Unauthorized);
				web.logger.debug('-> Rejected call: unauthorized');
				return; 
			}

			// Validate the request payload using the Json Schema
			// specified by the controller.
			const reqResult = controller.schema().validate(req.body);

			if(!reqResult.isValid) {
				res.status(HttpStatus.BadRequest).json(reqResult.reasons);
				web.logger.debug('-> Rejected call: invalid payload');
				return; 
			}

			web.logger.debug('-> Calling controller ' + controller.constructor.name)

			// Forward the request and response handles to the
			// controller handle method for further processing.
			try {
				await controller.handle(req, res, {
					app: web.app,
					user: user,
					state: state,
					respond: (value: any) => res.json(buildJsonResponse(value))
				});
			} catch(err) {
				res.sendStatus(HttpStatus.InternalServerError);
				web.logger.error('-> Failed call: error caught inside call handle');
				console.error(err);
			}
		};
	}
}