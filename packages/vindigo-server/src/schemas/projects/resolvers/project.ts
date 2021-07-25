import { GraphQLResolvers } from "../../../http";
import { Project } from "../../../models/project";

function composeSlug(project: Project): string {
	return [project.id, ...project.name.toLowerCase().split(' ')].join('-');
}

export default {
	slug: async (project) => {
		return composeSlug(project);
	},
	projectUrl: async (project) => {
		return '/project/' + composeSlug(project);
	}
} as GraphQLResolvers<Project>;