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