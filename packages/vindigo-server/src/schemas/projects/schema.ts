import { ISchemaProvider } from '../../http';
import Mutation from './resolvers/mutation';
import Query from './resolvers/query';
import { join } from "path";

/**
 * The project schema provides types for interacting
 * with projects, tasks, and views within.
 */
export class ProjectsSchema implements ISchemaProvider {

	public id = 'projects'

	public schema = join(__dirname, 'projects.graphql');

	public resolvers = {
		Query,
		Mutation
	}

}