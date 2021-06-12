import { GraphQLResolvers } from "../../../http/provider";
import { User } from "../../../models/user";

export default {
	// FIXME Remove; this is for development ONLY
	fetchUserById: async (_, { id }) => {
		return User.findOne(id);
	},
	// FIXME Remove; this is for development ONLY
	fetchUserByUsername: async (_, { username }) => {
		return User.findOne({
			where: {
				username: username
			}
		});
	}
} as GraphQLResolvers<User>;