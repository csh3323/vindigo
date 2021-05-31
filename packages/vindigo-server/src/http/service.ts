import { IncomingMessage, createServer } from "http";
import { buildSchema, getAddress } from "./helpers";

import { ISchemaProvider } from "./provider";
import { IServerConfig } from "../util/config";
import { Server } from "http";
import WebSocket from 'ws';
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { logger } from "..";
import { useServer } from "graphql-ws/lib/use/ws";
import ws from "ws";

/**
 * The service in charge of serving http requests
 */
export class HTTPService {

	public clients = new Map<WebSocket, IncomingMessage>();
	public providers: ISchemaProvider[] = [];
	public express: Express.Application;

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
		this.registerApi();
		
		const port = this.config.general.port;

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
		
		// Configure the graphql-ws websocket handling for
		// subscription requests.
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

				if(this.clients.delete(socket)) {
					const request = this.clients.get(socket);
					const address = request ? getAddress(request) : 'unknown';

					logger.info(`Client lost connection (${address} ${this.clientAmount})`);
				}
			}
		}, graphqlWs);
	}
}