import { Request, Response } from "express";
import { UserProfile } from "../auth/UserProfile";
import { Schema } from "../schema/Schema";
import { TelescopeServer } from "../bootstrap/TelescopeServer";

/**
 * Controllers are an essential component of the backend API
 * framework and represent the logic behind each API call.
 * 
 * Each controller implementation represents a single API
 * endpoint, which includes its HTTP method.
 * 
 * When a connection is received from the client, the
 * appropriate controllers authorize() method is called,
 * which controlls whether the user has access or not.
 * When the user is not permitted access to a controller,
 * a 403 Forbidden status code is returned. When required
 * authentication details are missing, a 401 Unauthorized
 * status code is returned.
 * 
 * Once the controller has authorized a connection, the
 * request payload will be verified against the schema
 * declared by the controller. Failing to send a valid
 * payload will result in a 400 Bad Request status code,
 * together with a list of all issues found in the
 * request payload.
 * 
 * Finally, once the call has been authorized and validates,
 * the handler method is invoked in which the call will
 * communicate with various services in order to react
 * to the client request.
 */
export interface Controller {

	/**
	 * Called in order to describe the schema expected
	 * from the request body. The schema is described
	 * using the JSONSchema specification.
	 * 
	 * @returns Schema object
	 */
	schema() : Schema;

	/**
	 * Called in order to verify authorization for the
	 * inbound connection.
	 * 
	 * @param req Request
	 * @param app The telescope server
	 * @param user The user profile, only available when the user is logged in
	 * @returns Whether the connection is permitted
	 */
	authorize(app: TelescopeServer, req: Request, user?: UserProfile) : boolean;

	/**
	 * Called in order to execute logic related to this
	 * API call.
	 * 
	 * @param req Request
	 * @param app The telescope server
	 * @param res Response
	 * @param user The user profile, only available when the user is logged in
	 */
	handle(app: TelescopeServer, req: Request, res: Response, user?: UserProfile) : void;

}