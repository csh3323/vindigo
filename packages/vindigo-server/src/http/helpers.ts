import { GraphQLFileLoader, loadSchemaSync, makeExecutableSchema } from "graphql-tools";

import { GraphQLSchema } from "graphql";
import { ISchemaProvider } from "./provider";
import { IncomingMessage } from "http";
import { config } from "..";
import { merge } from "lodash";
import { readFileSync } from "fs";
import { sign } from "jsonwebtoken";

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
		loaders: [new GraphQLFileLoader()]
	});
}

/**
 * Throw the given error. Useful in combination with
 * the nullish coalescing operator.
 * 
 * @param type The error type
 */
export function elseThrow(err: Error): never {
	throw err;
}

/**
 * Generate an authentication token
 * 
 * @param uid The user unique id
 * @returns The auth token
 */
export function generateAuthToken(uid: string): string {
	return sign(uid, config.authentication.secret, { expiresIn: '1800s' });
}