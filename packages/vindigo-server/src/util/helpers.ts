/**
 * Throw the given error. Useful in combination with
 * the nullish coalescing operator.
 * 
 * @param type The error type
 */
export function elseThrow(err: Error): never {
	throw err;
}