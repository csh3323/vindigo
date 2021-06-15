import { GraphQLResolvers } from "../../../http/provider";
import { User } from "../../../models/user";

export default {
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