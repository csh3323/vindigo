import { InjectionKey, inject } from '@vue/composition-api';
import { TeleboardClient } from '../bootstrap/TeleboardClient';
import { StoreService } from '../store/StoreService';
import { RoutingService } from '../routing/RoutingService';

/** The TeleboardClient instance */
export const AppKey: InjectionKey<TeleboardClient> = Symbol('teleboard');

/** The Vuex store instance */
export const StoreKey: InjectionKey<StoreService> = Symbol('store');

/** The global router instance */
export const RouterKey: InjectionKey<RoutingService> = Symbol('router');

/**
 * Request the given key to be injected into the
 * current component, throwing an error when the
 * injection key could not be found. This method
 * calls the composition inject function under
 * the hood.
 * 
 * @param key Injection key
 * @returns The provided value
 * @throws When the key is not assigned
 */
export function injectKey<T>(key: InjectionKey<T>) : T {
	const value = inject(key);

	if(value === undefined) {
		throw new Error('Could not resolve ' + key.description);
	}

	return value;
}