import { GraphQLResolvers } from "../../../http/provider";
import { config } from "../../..";

export default {
	config: async () => {
		return {
			instanceName: config.general.name,
			allowRegister: config.authentication.registrations,
			allowAnonymous: config.authentication.anonymous_users
		};
	},
} as GraphQLResolvers;