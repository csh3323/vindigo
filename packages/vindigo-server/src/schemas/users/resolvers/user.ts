import { GraphQLResolvers } from "../../../http/provider";
import { User } from "../../../models/user";

export default {
	activity: () => {
		return 'ACTIVE';
	}
} as GraphQLResolvers<User>;