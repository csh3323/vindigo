import { ApiError, AuthenticationError } from '../../../http/errors';
import { compare, hash } from 'bcrypt';
import { elseThrow, generateAuthToken } from '../../../http/helpers';

import { GraphQLResolvers } from '../../../http/provider';
import { User } from '../../../models/user';
import { logger } from '../../..';

const SALT_ROUNDS = 7;

export default {
	register: async (_, { details }) => {
		const password = await hash(details.password, SALT_ROUNDS);
		const user = new User();

		user.username = details.username;
		user.firstName = details.firstName;
		user.lastName = details.lastName;
		user.email = details.email;
		user.password = password;

		logger.info(`Registered new user ${details.username}`);

		const saved = await user.save();

		return {
			user: saved,
			token: generateAuthToken(user.username)
		};
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

		const user = await User.findOne({where: filter}) ?? elseThrow(new AuthenticationError());
		const valid = await compare(details.password, user.password);

		if(!valid) {
			throw new AuthenticationError();
		}

		logger.info(`Authenticated ${user.username}`);

		return {
			user: user,
			token: generateAuthToken(user.username)
		};
	}
} as GraphQLResolvers;