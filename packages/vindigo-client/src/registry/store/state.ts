import { Dictionary } from "vue-router/types/router";
import { store } from "../..";
import { storeActions } from "./actions";
import { storeMutations } from "./mutations";

/**
 * The root state for the vindigo client
 */
export interface RootState {
	profile: any,
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
			loading: {
				i18n: false
			}
		}
	});

}