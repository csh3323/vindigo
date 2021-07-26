import { identity, values } from "lodash";

import { MutationTree } from "vuex";
import { RootState } from "./state";

/**
 * Register store mutations
 */
export const storeMutations: MutationTree<RootState> = {

	/**
	 * Mark a scope as successfully loaded
	 */
	setLoaded(state, scope: string) {
		state.loading[scope] = true;

		if(values(state.loading).every(identity)) {
			state.isReady = true;
		}
	},

	/**
	 * Set whether the loading bar is visible
	 */
	setWaiting(state, value) {
		state.isWaiting = value;
	},

	/**
	 * Save the config instance
	 */
	storeConfig(state, config) {
		state.config = config;
	},


	/**
	 * Store the current user profile
	 */
	storeProfile(state, profile) {
		state.profile = profile;
		state.isAuthed = !!profile;
	},

	/**
	 * Set whether dark mode is enabled
	 */
	setDarkMode(state, enabled) {
		localStorage.setItem('vindigo:dark', enabled);
		state.isDark = enabled;
	},

	/**
	 * Set the currently loaded interface language
	 */
	setLanguage(state, language) {
		localStorage.setItem('vindigo:lang', language);
		state.language = language;
	}

};