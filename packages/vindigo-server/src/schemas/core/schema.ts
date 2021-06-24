import { ISchemaProvider } from '../../http/provider';
import Mutation from './resolvers/mutation';
import Profile from './resolvers/profile';
import Query from './resolvers/query';
import { join } from "path";

/**
 * The core schema provides types essential to the
 * core functioning of the Vindigo client.
 */
export class CoreSchema implements ISchemaProvider {

	public id = 'core'

	public schema = join(__dirname, 'core.graphql');

	public resolvers = {
		Query,
		Mutation,
		Profile
	}

}