import { ISchemaProvider } from '../../http/provider';
import Mutation from './resolvers/mutation';
import Query from './resolvers/query';
import User from './resolvers/user';
import { join } from "path";

/**
 * The schema in charge of handling user related requests
 */
export class UserSchema implements ISchemaProvider {

	public id = 'user'

	public schema = join(__dirname, 'users.graphql');

	public resolvers = {
		Mutation,
		Query,
		User
	}

}