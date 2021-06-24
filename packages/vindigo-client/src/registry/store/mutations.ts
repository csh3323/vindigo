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
	}

};