import { GraphQLResolvers } from "../../../http";
import { User } from "../../../models/user";

export default {
	fullName: (profile) => {
		return profile.name;
	},
	firstName: (profile) => {
		return profile.name.split(' ')[0];
	},
} as GraphQLResolvers<User>;