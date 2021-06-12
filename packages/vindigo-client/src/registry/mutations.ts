import { MutationTree } from "vuex";
import { RootState } from "./state";

/**
 * Register store mutations
 */
export const storeMutations: MutationTree<RootState> = {
	initialized(state) {
		state.initialized = true;
	}
};