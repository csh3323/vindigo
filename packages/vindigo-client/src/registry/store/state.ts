import { ClientConfig } from "../../model/config";
import { Dictionary } from "vue-router/types/router";
import { store } from "../..";
import { storeActions } from "./actions";
import { storeGetters } from "./getters";
import { storeMutations } from "./mutations";

/**
 * The root state for the vindigo client
 */
export interface RootState {
	isDark: boolean,
	profile: any,
	authToken: string|undefined,
	refreshToken: string|undefined,
	isReady: boolean,
	loading: Dictionary<boolean>,
	config: ClientConfig
}

/**
 * Register all store state
 */
export function registerState() {

	store.defineNamespace({
		id: 'core',
		mutations: storeMutations,
		actions: storeActions,
		getters: storeGetters,
		state: {
			isDark: false,
			profile: null,
			authToken: localStorage.getItem('vindigo:authToken') || undefined,
			refreshToken: localStorage.getItem('vindigo:refreshToken') || undefined,
			isReady: false,
			loading: {
				auth: false,
				i18n: false,
				config: false
			},
			config: {
				instanceName: '',
				allowAnonymous: false,
				allowRegister: false
			}
		}
	});

}