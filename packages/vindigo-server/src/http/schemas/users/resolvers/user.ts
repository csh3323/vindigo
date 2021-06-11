import { GraphQLResolvers } from "../../../provide";
import { User } from "../../../../database/model/user";

export default {
	activity: (user, args, ctx) => {
		return 'ACTIVE';
	}
} as GraphQLResolvers<User>;