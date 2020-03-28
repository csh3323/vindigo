import { onMounted, onUnmounted, ref } from '@vue/composition-api';
import { injectKey, RouterKey } from './Providers';
import { Route } from 'vue-router';

/**
 * Executes an interval specefied by the given time in milliseconds
 * and executes the passed function. The inverval is automatically
 * instantiated and cleared on component mount and unmount.
 * 
 * @param interval Interval in ms
 * @param callback Callback function
 */
export function interval(interval: number, callback: () => any) {
	let task: any;
	

	onMounted(() => {
		task = setInterval(callback, interval);
	});

	onUnmounted(() => {
		clearInterval(task);
	});
}

/**
 * Listens for a change of the current route and calls the provided
 * callback with the target and previous route. The listener is
 * automatically stared on mount, and cleaned up on unmount.
 * 
 * @param callback Callback function
 */
export function routeChanged(callback: (to: Route, from: Route) => any) {
	const routing = injectKey(RouterKey);

	// Listen for changes of the current route
	let listener: Function;

	onMounted(() => {
		listener = routing.router.afterEach((to, from) => {
			callback(to, from);
		});
	});

	onUnmounted(() => {
		if(listener) listener();
	});
}

/**
 * Returns true when the given string is a hex color code
 * 
 * @param value The string to test
 * @returns Result boolean
 */
export function isHexColor(value: string) : boolean {
	return /^#([0-9A-F]{3}|[0-9A-F]{6})$/mi.test(value);
}