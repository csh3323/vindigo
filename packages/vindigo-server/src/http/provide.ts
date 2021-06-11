import { IResolvers } from "graphql-tools";
import { User } from "../database/model/user";

/**
 * Used to enable type checking for resolver
 * declarations while including correct resolver context
 */
export type GraphQLResolvers<Source = any> = IResolvers<Source, ResolverContext>

/**
 * A provider of a GraphQL Schema together with
 * implementation resolvers.
 */
export interface ISchemaProvider {

	/**
	 * The unique identification of this schema
	 */
	id: string;

	/**
	 * The schema associated with this module, if present
	 */
	schema: string;

	/**
	 * The associated graphql schema resolvers, if present
	 */
	resolvers: GraphQLResolvers<any>;

}

/**
 * The context instance passed to resolvers
 */
export interface ResolverContext {
	user: User;
}