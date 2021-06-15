import { ActionTree } from "vuex";
import { RootState } from "./state";
import { api } from "../..";
import gql from "graphql-tag";

/**
 * Register store actions
 */
export const storeActions: ActionTree<RootState, RootState> = {
	
	/**
	 * Request the latest client config
	 */
	async fetchConfig({ commit }) {
		const { config } = await api.query(gql`
			query FetchConfig {
				config {
					instanceName
					allowRegister
					allowAnonymous
				}
			}
		`);
		
		commit('storeConfig', config);
		commit('setLoaded', 'config');
	},

	/**
	 * Authenticate with the server
	 */
	async authenticate({ state, commit }) {
		if(!state.refreshToken) {
			commit('setLoaded', 'auth');
		} else {
			const { renewToken } = await api.query(gql`
				query RenewToken($refresh: String!) {
					renewToken(refresh: $refresh) {
						token
					}
				}
			`);

			commit('storeTokens', renewToken.token);
			commit('setLoaded', 'auth');
		}
	}

};