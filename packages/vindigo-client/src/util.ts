/**
 * Create a logger instance that prepends all messages
 * with the specified label.
 * 
 * @param label The label
 * @returns Logging function
 */
export function logger(label: string): (...args: any[]) => void {
	return (...args: any) => {
		console.log(`[${label}]`, ...args);
	};
}

/**
 * Parse the given string to a number, and simply
 * return any number passed in.
 * 
 * @param value The input
 * @returns The number
 */
export function cleanInt(value: string|number): number {
	if(typeof value == 'number') {
		return value;
	} else {
		return parseInt(value);
	}
}