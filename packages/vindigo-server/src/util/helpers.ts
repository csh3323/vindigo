/**
 * Throw the given error. Useful in combination with
 * the nullish coalescing operator.
 * 
 * @param type The error type
 */
export function elseThrow(err: Error): never {
	throw err;
}

/**
 * Returns whether the current environment is
 * running in production mode.
 * 
 * @returns True if production
 */
export function isProduction(): boolean {
	return process.env.NODE_ENV == 'production';
}