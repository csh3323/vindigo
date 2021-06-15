import { GraphQLResolvers } from "../../../http/provider";
import { User } from "../../../models/user";
import { config } from "../../..";

export default {
	config: async () => {
		return {
			instanceName: config.general.name,
			allowRegister: config.authentication.registrations,
			allowAnonymous: config.authentication.anonymous_users
		};
	},
	profileById: async (_, { id }) => {
		return User.findOne(id);
	},
	profileByName: async (_, { username }) => {
		return User.findOne({
			where: {
				username: username
			}
		});
	}
} as GraphQLResolvers;