import { ClientConfig } from "../../model/config";
import { Dictionary } from "vue-router/types/router";
import { Optional } from "../../typings/types";
import { Profile } from "../../model/profile";
import { store } from "../..";
import { storeActions } from "./actions";
import { storeGetters } from "./getters";
import { storeMutations } from "./mutations";

const isDarkMode = localStorage.getItem('vindigo:dark') == 'true';
const initialLang = localStorage.getItem('vindigo:lang') || 'en-US';

/**
 * The root state for the vindigo client
 */
export interface RootState {
	isDark: boolean,
	language: string,
	profile: Optional<Profile>,
	isAuthed: boolean,
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
			isDark: isDarkMode,
			language: initialLang,
			profile: null,
			isAuthed: false,
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