import { MutationTree } from "vuex";
import { RootState } from "./state";

/**
 * Register store mutations
 */
export const storeMutations: MutationTree<RootState> = {

	// Mark a scope as successfully loaded
	setLoaded(state, scope: string) {
		state.loading[scope] = true;
	}

};