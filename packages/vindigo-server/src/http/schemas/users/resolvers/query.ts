import { GraphQLResolvers } from "../../../provide";
import { User } from "../../../../database/model/user";

export default {
	fetchUserById: async (_, { id }) => {
		return User.findOne(id);
	},
	fetchUserByUsername: async (_, { username }) => {
		return User.findOne({
			where: {
				username: username
			}
		});
	}
} as GraphQLResolvers<User>;