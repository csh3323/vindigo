import { MissingSessionError, NotImplementedError } from "../../../util/errors";
import { database, logger } from "../../..";

import { FindConditions } from "typeorm";
import { GraphQLResolvers } from "../../../http";
import { Project } from "../../../models/project";
import { parseTakeSize } from "../../../util/http";

export default {
	projects: async (_, { mode, skip, take }, ctx) => {
		let filter: FindConditions<Project>;

		switch(mode) {
			case 'PERSONAL': {
				if(!ctx.user) {
					throw new MissingSessionError();
				}

				filter = {
					creatorId: ctx.user.id
				};

				break;
			}
			case 'PUBLIC': {
				filter = {
					isPublic: true
				};
				break;
			}
			case 'RECENTS': {
				throw new NotImplementedError();
			}
			default: {
				throw new Error('Unknown list mode');
			}
		}

		return await Project.find({
			where: filter,
			skip: skip,
			take: parseTakeSize(take, 50)
		});
	}
} as GraphQLResolvers;