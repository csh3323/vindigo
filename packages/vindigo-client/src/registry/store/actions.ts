import { ActionTree } from "vuex";
import { RootState } from "./state";
import { api } from "../..";
import gql from "graphql-tag";

const CONFIG_QUERY = gql`
	query FetchConfig {
		config {
			instanceName
			allowRegister
			allowAnonymous
		}
	}
`;

/**
 * Register store actions
 */
export const storeActions: ActionTree<RootState, RootState> = {
	
	// Request the latest version of the config
	async fetchConfig({ commit }) {
		const res = await api.query(CONFIG_QUERY);
		
		commit('storeConfig', res.config);
		commit('setLoaded', 'config');
	}

};