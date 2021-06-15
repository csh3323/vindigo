import { ApiError, AuthenticationError } from '../../../http/errors';
import { compare, hash } from 'bcrypt';

import { GraphQLResolvers } from '../../../http/provider';
import { User } from '../../../models/user';
import { config } from '../../../index';
import { logger } from '../../..';
import { sign } from 'jsonwebtoken';

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

		logger.info(`Registered new user ${details.username}`);

		return user.save();
	},
	authenticate: async (_, { details }) => {
		if(!details.email && !details.username) {
			throw new ApiError('invalid-request');
		}

		// Handle both email and username authentcation
		const filter = details.email ? {
			email: details.email
		} : {
			username: details.username
		};

		// Find the user account
		const user = await User.findOne({where: filter});

		if(!user) {
			throw new AuthenticationError();
		}

		// Validate the password
		const valid = await compare(details.password, user.password);

		if(!valid) {
			throw new AuthenticationError();
		}

		const secret = config.authentication.secret;
		const token = sign(String(user.id), secret);

		logger.info(`Authenticated ${user.username}`);

		return {
			user,
			token
		};
	}
} as GraphQLResolvers;