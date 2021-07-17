import { GraphQLFileLoader, loadSchemaSync, makeExecutableSchema } from "graphql-tools";

import { GraphQLSchema } from "graphql";
import { ISchemaProvider } from "../http";
import { IncomingMessage } from "http";
import { PaginationOverflowError } from "./errors";
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
 */
export function buildSchema(providers: ISchemaProvider[]): GraphQLSchema {
	const resolvers = merge(providers.map((pro) => pro.resolvers || {}));
	const combined = providers.map((pro) => readFileSync(pro.schema, 'utf-8')).join('\n');
	
	try {
		return makeExecutableSchema({
			typeDefs: combined,
			resolvers: resolvers
		});
	} catch(err) {
		throw new Error('Failed to build GraphQL schema: ' + err.message);
	}
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
		loaders: [new GraphQLFileLoader()]
	});
}

/**
 * Ensure that the requested amount of pagination items
 * does not exceed the maximum.
 * 
 * @param take The amount of items requested
 * @param max The maximum amount
 */
export function parseTakeSize(take: number|undefined, max: number) {
	if(!take) {
		return max;
	} else if(take > max) {
		throw new PaginationOverflowError(max);
	} else {
		return take;
	}
}