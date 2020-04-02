import { Controller } from "./Controller";
import { RequestHandler } from "express";
import { HttpStatus } from "../common/Statuses";
import { TelescopeServer } from "../bootstrap/TelescopeServer";
import { WebService } from "./WebService";
import { UserProfile } from "../database/model/UserProfile";

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

		return (req, res) => {
			let user: UserProfile|undefined;

			// TODO Implement token retrieval
			user = new UserProfile();

			// Authorize the call and respond with 401 Unauthorized
			// when the user is not currently logged in, and with
			// 403 Forbidden when the user lacks permission.
			if(!controller.authorize(web.app, req, user)) {
				res.sendStatus(user ? HttpStatus.Forbidden : HttpStatus.Unauthorized);
				web.logger.debug('-> Rejected call: unauthorized');
				return; 
			}

			const reqBody = req.body || {};

			// Validate the request payload using the Json Schema
			// specified by the controller.
			const reqResult = controller.schema().validate(reqBody);

			if(!reqResult.isValid) {
				res.status(HttpStatus.BadRequest).json(reqResult.reasons);
				web.logger.debug('-> Rejected call: invalid payload');
				return; 
			}

			web.logger.debug('-> Calling controller ' + controller.constructor.name)

			// Forward the request and response handles to the
			// controller handle method for further processing.
			controller.handle(web.app, req, res);
		};
	}
}