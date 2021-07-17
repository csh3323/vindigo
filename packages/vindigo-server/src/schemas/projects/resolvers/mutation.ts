import { InvalidArgumentError, MissingSessionError } from "../../../util/errors";

import { GraphQLResolvers } from "../../../http";
import { Project } from "../../../models/project";

export default {
	createProject: async (_, { details }, ctx) => {
		if(!ctx.user) {
			throw new MissingSessionError();
		}

		const name = details.name;
		const isPublic = details.public;
		const description = details.description;

		if(name.length > 32) {
			throw new InvalidArgumentError("Name cannot exceed 32 characters");
		}

		const project = new Project();

		project.name = name;
		project.isPublic = isPublic;
		project.createdAt = new Date();
		project.lastModifiedAt = new Date();
		project.description = description || '';
		project.creatorId = ctx.user.id;
		project.isVisible = true;
		project.isClosed = false;
		project.isPublic = isPublic;

		return await project.save();
	}
} as GraphQLResolvers;