import { ISchemaProvider } from '../../http';
import Mutation from './resolvers/mutation';
import Query from './resolvers/query';
import { join } from "path";

/**
 * The project schema provides types for interacting
 * with projects, tasks, and views within.
 */
export class TeamsSchema implements ISchemaProvider {

	public id = 'project'

	public schema = join(__dirname, 'teams.graphql');

	public resolvers = {
		Query,
		Mutation
	}

}