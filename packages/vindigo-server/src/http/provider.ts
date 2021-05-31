import { GraphQLSchema } from "graphql";
import { IResolvers } from "graphql-tools";

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
	schema: GraphQLSchema;

	/**
	 * The associated graphql schema resolvers, if present
	 */
	resolvers: IResolvers;

}