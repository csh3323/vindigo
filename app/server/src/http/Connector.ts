import { Controller } from "./Controller";
import { RequestHandler } from "express";
import { UserProfile } from "../auth/UserProfile";
import { HttpStatus } from "../common/Statuses";
import { TelescopeServer } from "../bootstrap/TelescopeServer";

/**
 * Create a connector function that can connect
 * a supplied Controller to an express supported
 * RequestHandler function.
 * 
 * @param app The TelescopeServer
 * @returns connector function
 */
export function createConnector(app: TelescopeServer) {
	return function connect(controller: Controller) : RequestHandler {
		return (req, res) => {
			let user: UserProfile|undefined;

			// TODO Implement token retrieval
			user = new UserProfile("not implemented");

			// Authorize the call and respond with 401 Unauthorized
			// when the user is not currently logged in, and with
			// 403 Forbidden when the user lacks permission.
			if(!controller.authorize(app, req, user)) {
				res.sendStatus(user ? HttpStatus.Forbidden : HttpStatus.Unauthorized);
				return; 
			}

			const reqBody = req.body || {};

			// Validate the request payload using the Json Schema
			// specified by the controller.
			const reqResult = controller.schema().validate(reqBody);

			if(!reqResult.isValid) {
				res.status(HttpStatus.BadRequest).json(reqResult.reasons);
				return; 
			}

			// Forward the request and response handles to the
			// controller handle method for further processing.
			controller.handle(app, req, res);
		};
	}
}