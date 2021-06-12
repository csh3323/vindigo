/**
 * Thrown when an expected and handlable exception
 * was thrown from an API in order to signal an
 * error code for the client.
 */
export class ApiError extends Error {

	public code: string;

	public constructor(code: string, message?: string) {
		super(message);
		this.code = code;
		this.name = "ApiError";
	}

}

/**
 * Thrown when authentication fails without providing
 * a specific reason for the failure.
 */
export class AuthenticationError extends ApiError {

	public constructor() {
		super('auth-failed');
	}

}