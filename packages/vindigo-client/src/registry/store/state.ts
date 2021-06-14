import { Dictionary } from "vue-router/types/router";
import { store } from "../..";
import { storeActions } from "./actions";
import { storeMutations } from "./mutations";

/**
 * The root state for the vindigo client
 */
export interface RootState {
	profile: any,
	authToken: string|undefined,
	refreshToken: string|undefined,
	loading: Dictionary<boolean>
}

/**
 * Register all store state
 */
export function registerState() {

	store.defineNamespace({
		id: 'core',
		mutations: storeMutations,
		actions: storeActions,
		state: {
			profile: null,
			authToken: localStorage.getItem('vindigo:authToken') || undefined,
			refreshToken: localStorage.getItem('vindigo:refreshToken') || undefined,
			loading: {
				i18n: false
			}
		}
	});

}