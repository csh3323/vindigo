/**
 * Root class for all errors thrown by Telescope
 */
export class TelescopeError extends Error {
	constructor(message: string) {
		super(message);
		
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * An error thrown when an error is caught during
 * the handling of an incoming HTTP request.
 */
export class WebServiceError extends Error {
	public request: Express.Request;

	constructor(message: string, req: Express.Request) {
		super(message);
		
		this.request = req;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}