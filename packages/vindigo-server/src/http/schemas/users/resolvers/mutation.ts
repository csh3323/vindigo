import { compare, hash } from 'bcrypt';

import { ApiError } from "../../../errors";
import { GraphQLResolvers } from "../../../provide";
import { User } from "../../../../database/model/user";
import { logger } from '../../../..';

const SALT_ROUNDS = 7;

export default {
	register: async (_, { details }) => {
		const user = new User();
		const password = await hash(details.password, SALT_ROUNDS);

		user.username = details.username;
		user.firstName = details.firstName;
		user.lastName = details.lastName;
		user.email = details.email;
		user.password = password;

		logger.info('Creating new user ' + details.email);

		return user.save();
	},
	authenticate: async (_, { details }) => {
		if(!details.email && !details.username) {
			throw new ApiError('invalid-request');
		}

		const filter = details.email ? {
			email: details.email
		} : {
			username: details.username
		};

		const user = await User.findOne({where: filter});

		if(!user) {
			throw new ApiError('unknown-user');
		}

		const valid = await compare(details.password, user.password);

		if(!valid) {
			throw new ApiError('unknown-user');
		}

		const token = "something";

		return {
			user,
			token
		};
	}
} as GraphQLResolvers;