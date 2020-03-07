import { VueConstructor } from 'vue';

/**
 * Allows extensions to modify the returned value from
 * the specified method by providing a callback.
 * 
 * The callback receives the return value of the underlying
 * method as its first parameter. Additional parameters
 * passed to the underlying method are also passed into
 * the callback.
 * 
 * Credits to https://flarum.org/ for inspiration. 
 * 
 * TODO Recreate this for the Composition API
 * 
 * @param component The component to override
 * @param method The method to override
 * @param callback Custom logic to patch onto the original method
 */
export function patch(component: VueConstructor, method: string, callback: (any) => any) {
	const handler = component['methods'][method];

	component['methods'][method] = function() {
		const value = handler ? handler.apply(this, arguments) : undefined;

		callback.apply(this, [value].concat(arguments));

		return value;
	};

	Object.assign(component['methods'][method], handler);
}