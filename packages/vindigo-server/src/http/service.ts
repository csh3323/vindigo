import { IncomingMessage, createServer } from "http";
import { buildSchema, getAddress } from "./helpers";

import { ApiError } from "./errors";
import { GraphQLError } from "graphql";
import { ISchemaProvider } from "./provide";
import { IServerConfig } from "../util/config";
import { Server } from "http";
import WebSocket from 'ws';
import cors from "cors";
import depthLimit from "graphql-depth-limit";
import { existsSync } from "fs";
import express, {  } from "express";
import { graphqlHTTP } from "express-graphql";
import helmet from "helmet";
import { logger } from "..";
import path from "path";
import { useServer } from "graphql-ws/lib/use/ws";
import ws from "ws";

/**
 * The service in charge of serving http requests
 */
export class HTTPService {

	public clients = new Map<WebSocket, IncomingMessage>();
	public providers: ISchemaProvider[] = [];
	public express: express.Application;

	private server: Server;
	private config: IServerConfig;

	public constructor(config: IServerConfig) {
		this.config = config;

		const app = express();

		app.use(cors());
		app.use(helmet());

		this.express = app;
		this.server = createServer(app);
	}

	/**
	 * Start the HTTP Service and listen on the
	 * port specified in the config.
	 */
	public start() {
		const port = this.config.general.port;

		this.registerApi();
		this.registerStatic();

		this.server.listen(port, () => {
			logger.success('Vindigo Server running on port ' + port);
		});
	}

	/**
	 * Terminate the HTTP Service and unbind the port
	 */
	public stop() {
		logger.info('Stopping HTTP Service');
		this.server.close();

	}

	/**
	 * Returns the amount of connected clients
	 */
	public get clientAmount(): number {
		return this.clients.size;
	}

	/**
	 * Register the API related routes on the HTTP server
	 * 
	 * @param http The HTTP server
	 * @param app The express app
	 * @param providers The availavble schema providers
	 */
	private registerApi() {
		const graphqlWs = new ws.Server({ server: this.server, path: '/subscriptions' });
		const schema = buildSchema(this.providers);

		// Configure a plain HTTP endpoint for handling
		// simple non-subscription GraphQL requests.
		this.express.use('/graphql', async (req, res) => {
			const authorization = req.header('Authorization');
			const context: any = { req, res };

			// TODO Bean can implement auth I dont want to

			graphqlHTTP({
				schema: schema,
				context: context,
				validationRules: [
					depthLimit(4)
				],
				customFormatErrorFn: (err: GraphQLError) => {
					if (err.originalError instanceof ApiError) {
						return { ...err, code: err.originalError.code };
					} else {
						return { ...err };
					}
				}
			})(req, res);
		});

		// Configure graphql-ws to provide means of executing
		// GraphQL requests over web sockets, allowing subscription
		// streaming to work.
		useServer({
			schema,
			onConnect: async (context) => {
				const params = context.connectionParams || {} as any;
				const request = context.extra.request;
				const socket = context.extra.socket;
				const address = getAddress(request);
				const paramAuth = params['Authorization'];

				// TODO Bean can implement auth I dont want to

				this.clients.set(socket, request);

				logger.info(`Client connection opened (${address} ${this.clientAmount})`);
			},
			onDisconnect: async (context) => {
				const socket = context.extra.socket;

				if (this.clients.delete(socket)) {
					const request = this.clients.get(socket);
					const address = request ? getAddress(request) : 'unknown';

					logger.info(`Client lost connection (${address} ${this.clientAmount})`);
				}
			}
		}, graphqlWs);
	}

	/**
	 * Register the static file server in charge of
	 * serving the vindigo client.
	 */
	private registerStatic() {
		const clientPath = path.join(__dirname, '../../../vindigo-client/dist');
		const indexPath = path.join(clientPath, 'index.html');

		// Exit the server if the client distribution
		// files have not yet been compiled.
		if(!existsSync(indexPath)) {
			logger.error('Failed to locate client distribution files. Make sure vindigo-client has been built before starting the server.');
			process.exit(0);
		}

		// Load any static resources
		this.express.use(express.static(clientPath));

		// Handle remaining routes in client
		this.express.get('*', (_, res) => {
			res.sendFile(indexPath);
		});
	}
}