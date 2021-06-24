import { GraphQLResolvers } from "../../../http/provider";
import { User } from "../../../models/user";
import { config } from "../../..";

export default {
	config: async (_, _args, ctx) => {
		console.log(ctx.user);
		
		return {
			instanceName: config.general.name,
			allowRegister: config.authentication.registrations,
			allowAnonymous: config.authentication.anonymous_users
		};
	},
	profile: async (_, _args, ctx) => {
		return ctx.user;
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