import { GraphQLSchema } from "graphql";
import { ISchemaProvider } from "./provider";
import { IncomingMessage } from "http";
import { merge } from "lodash";
import { mergeSchemas } from "graphql-tools";

/**
 * Parses the address from the given message
 * 
 * @param request The request
 * @returns The address
 */
export function getAddress(request: IncomingMessage): string {
	return request.headers['x-forwarded-for'] as string || request?.socket?.remoteAddress || 'Unknown';
}

/**
 * Configure the GraphQL API Endpoints
 */
export function buildSchema(providers: ISchemaProvider[]): GraphQLSchema {
	const resolvers = merge(providers.map((pro) => pro.resolvers || {}));
	const schemas = providers.map((pro) => pro.schema);

	return mergeSchemas({ schemas, resolvers });
}