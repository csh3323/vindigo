import { ActionTree } from "vuex";
import { RootState } from "./state";
import { api } from "../..";
import gql from "graphql-tag";
import { profileFragment } from "../../fragments";

/**
 * Register store actions
 */
export const storeActions: ActionTree<RootState, RootState> = {
	
	/**
	 * Request the latest client config
	 */
	async fetchConfig({ commit }) {
		const { config } = await api.query(gql`
			query {
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
	async authenticate({ commit }) {
		const res = await api.query(gql`
			query {
				profile {
					...AllProfileFields
				}
			}
			${profileFragment}
		`);

		commit('storeProfile', res.profile);
		commit('setLoaded', 'auth');
	},

	/**
	 * Sign in to a valid user account
	 */
	async signIn({ commit }, details) {
		const result = await api.query(gql`
			mutation ($details: UserAuthentication!) {
				authenticate(details: $details) {
					...AllProfileFields
				}
			}
			${profileFragment}
		`, { details });

		commit('storeProfile', result.authenticate);

		return result.authenticate;
	},

	async signUp({ commit }, details) {
		const result = await api.query(gql`
			mutation ($details: UserRegistration!) {
				register(details: $details) {
					...AllProfileFields
				}
			}
			${profileFragment}
		`, { details });

		commit('storeProfile', result.register);

		return result.register;
	},

	/**
	 * Sign the user out from the application
	 */
	async signOut({ commit }) {
		api.query(gql`
			mutation {
				signOut
			}
		`);

		commit('storeProfile', null);
	}

};