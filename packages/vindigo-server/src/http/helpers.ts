import { GraphQLFileLoader, loadSchemaSync, makeExecutableSchema } from "graphql-tools";

import { GraphQLSchema } from "graphql";
import { ISchemaProvider } from "./provide";
import { IncomingMessage } from "http";
import { merge } from "lodash";
import { readFileSync } from "fs";

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
 * 
 * TODO Load files in parallel 
 */
export function buildSchema(providers: ISchemaProvider[]): GraphQLSchema {
	const resolvers = merge(providers.map((pro) => pro.resolvers || {}));
	const combined = providers.map((pro) => readFileSync(pro.schema, 'utf-8')).join('\n');
	
	return makeExecutableSchema({
		typeDefs: combined,
		resolvers: resolvers
	});
}

/**
 * Load and parse a GraphQL Schema from the
 * specified file path.
 * 
 * @param path The path to the .graphql file
 * @returns The parsed schema
 */
export function readSchema(path: string): GraphQLSchema {
	return loadSchemaSync(path, {
		loaders: [new GraphQLFileLoader()],
		assumeValidSDL: true
	});
}