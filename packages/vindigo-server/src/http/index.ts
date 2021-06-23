import { ISchemaProvider, ResolverContext } from "./provider";
import { IncomingMessage, createServer } from "http";
import { buildSchema, getAddress } from "./helpers";
import { database, logger } from "..";
import express, { Request } from "express";

import { ApiError } from "./errors";
import { GraphQLError } from "graphql";
import { IServerConfig } from "../util/config";
import { Server } from "http";
import { Session } from "../models/session";
import { TypeormStore } from "connect-typeorm";
import { User } from "../models/user";
import WebSocket from 'ws';
import cors from "cors";
import depthLimit from "graphql-depth-limit";
import { existsSync } from "fs";
import { graphqlHTTP } from "express-graphql";
import helmet from "helmet";
import path from "path";
import session from 'express-session';
import { useServer } from 'graphql-ws/lib/use/ws';
import ws from "ws";

/**
 * The service in charge of serving http requests
 */
export class HTTPService {

	public clients = new Map<WebSocket, IncomingMessage>();
	public express: express.Application;
	
	private server: Server;
	private config: IServerConfig;
	private providers: ISchemaProvider[] = [];

	public constructor(config: IServerConfig) {
		this.config = config;

		const app = express();

		this.express = app;
		this.server = createServer(app);
	}

	/**
	 * Start the HTTP Service and listen on the
	 * port specified in the config.
	 */
	public async start() {
		const app = this.express;
		const port = this.config.general.port;
		const secret = this.config.authentication.secret;
		const isProduction = process.env.NODE_ENV == 'production';
		const sessionRepo = database.connection.getRepository(Session);

		if(isProduction) {
			app.set('trust proxy', 1);
		}

		// Configure the session store
		const sessionStore = new TypeormStore({
			cleanupLimit: 2,
			limitSubquery: false,
			ttl: 86400
		}).connect(sessionRepo);

		// Configure express
		app.use(cors());
		app.use(helmet());
		app.use(session({
			name: 'session',
			secret: secret,
			resave: false,
			store: sessionStore,
			saveUninitialized: false,
			cookie: {
				secure: isProduction,
				httpOnly: true,
				sameSite: true
			}
		}));

		// Hook in core endpoints
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
	 * Define a new schema provider to insert further
	 * types and fields into the GraphQL schema.
	 * 
	 * @param provider The provider
	 */
	public defineProvider(provider: ISchemaProvider) {
		this.providers.push(provider);
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
			const context: ResolverContext = { req, res };

			if(req.session.userId) {
				context.user = await User.findOne(req.session.userId);
			}

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
		useServer<ResolverContext>({
			schema,
			onConnect: async (context) => {
				const request = context.extra.request as Request;
				const socket = context.extra.socket;
				const address = getAddress(request);

				if(request.session.userId) {
					context.extra.user = await User.findOne(request.session.userId);
				}

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