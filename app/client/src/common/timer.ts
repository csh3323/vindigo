import { onMounted, onBeforeUnmount } from '@vue/composition-api';

/**
 * Executes an interval specefied by the given time in milliseconds
 * and executes the passed function. The inverval is automatically
 * instantiated and cleared on component mount and unmount.
 * 
 * @param interval Interval in ms
 * @param callback Callback function
 */
export function interval(interval: number, callback: Function) {
	let task: any;

	onMounted(() => {
		task = setInterval(callback, interval);
	});

	onBeforeUnmount(() => {
		clearInterval(task);
	});
}