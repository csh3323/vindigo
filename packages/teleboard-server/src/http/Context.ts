import { TeleboardServer } from "../bootstrap/TeleboardServer";
import { UserModel } from "../database/model/UserModel";

/**
 * Contextual information given to authorization handlers
 */
export interface AuthorizeContext {

	/** Reference to the TeleboardServer instance */
	app: TeleboardServer;

	/** The user executing the call, undefined when user is not logged in */
	user?: UserModel;

	/** Additional state that the authorization call may pass onto the handler */
	state?: {[key: string]: any}
}

/**
 * Contextual information given to controller handlers
 */
export interface HandlerContext extends AuthorizeContext {

	/**
	 * Utility for sending a JSON response to the client.
	 * Function may be passed an Error or any result.
	 * 
	 * @param value A value, or an error
	 * @returns The JSON sent to the client
	 */
	respond: (value: any) => any
}