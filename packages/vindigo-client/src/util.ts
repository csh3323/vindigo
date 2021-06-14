import { find } from "lodash";
import { Route } from "vue-router";

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

/**
 * Update the title of the current window
 * 
 * @param value The current page name, or undefined to remove
 */
export function updateTitle(value?: string) {
	if(value) {
		document.title = 'Vindigo • ' + value;
	} else {
		document.title = 'Vindigo';
	}
}

/**
 * Resolve the given meta key from the route meta or
 * any of the parent routes.
 * 
 * @param route The route
 * @param key The key to search
 * @returns The value
 */
export function getRouteMeta(route: Route, key: string): any {
	const found = find(route.matched, (r) => {
		return r.meta[key] !== undefined;
	});
	
	return found?.meta?.[key];
}