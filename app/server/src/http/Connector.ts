import { Controller } from "./Controller";
import { RequestHandler } from "express";
import { UserProfile } from "auth/User";
import { HttpStatus } from "common/Statuses";

/**
 * Connect the given controller instance to a
 * valid RequestHandler which can be passed
 * into route handlers.
 * 
 * @param controller The controllers
 * @returns RequestHandler
 */
export function connect(controller: Controller) : RequestHandler {
	return (req, res) => {
		let user: UserProfile|undefined;

		// TODO Implement token retrieval
		user = new UserProfile("not implemented");

		// Authorize the call and respond with 401 Unauthorized
		// when the user is not currently logged in, and with
		// 403 Forbidden when the user lacks permission.
		if(!controller.authorize(req, user)) {
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
		controller.handle(req, res);
	};
}