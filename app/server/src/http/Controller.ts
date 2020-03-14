import { Request, Response } from "express";

/**
 * Controllers are an essential component of the backend API
 * framework and represent the logic behind each API call.
 * 
 * Controllers 
 */
export interface Controller {

	/**
	 * Called in order to verify authorization for the
	 * inbound connection.
	 * 
	 * @param req Request
	 * @returns Whether the connection is permitted
	 */
	authorize(req: Request) : boolean;

	/**
	 * Called in order to describe the schema expected
	 * from the request body. The schema is described
	 * using the JSONSchema specification.
	 * 
	 * @returns Schema object
	 */
	schema() : object;

	/**
	 * Called in order to execute logic related to this
	 * API call.
	 * 
	 * @param req Request
	 * @param res Response
	 */
	handle(req: Request, res: Response) : void;

}