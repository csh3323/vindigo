import { TelescopeServer } from '../bootstrap/TelescopeServer';
import setupWs, { Router as WsRouter } from 'express-ws';
import express, { Router, Application, Request } from 'express';
import { setupCoreRoutes } from './Router';
import { Channel } from './Channel';
import { Logger } from 'winston';
import { Server } from 'http';
import path from 'path';
import WebSocket from 'ws';

/**
 * The TelescopeHost class runs the HTTP server
 * used for serving client files, 
 */
export class TelescopeHost {

	public readonly logger: Logger;
	public readonly app: TelescopeServer;
	public readonly server: Application;

	/** The  low level server instance */
	private httpServer?: Server;

	/** Currently connected channels */
	private channels: Channel[];

	public constructor(app: TelescopeServer) {
		this.app = app;
		this.server = express();
		this.logger = app.getLogger('HttpHost');
		this.channels = [];

		// Inject web socket functionality
		setupWs(this.server);
	}

	/**
	 * Start the web server and bind to the port defined
	 * in the Telescope config
	 */
	public start() {
		const port = this.app.config.web.port;
		
		// Setup the routes
		this.setupRouting(this.server);

		// Listen to all incoming GET requests
		this.httpServer = this.server.listen(port, (err) => {
			if(err) {
				this.logger.error('Failed to bind: ' + err);
				this.app.terminate();
				return;
			}

			this.logger.info('Successfully listening on port ' + port);
		});
	}

	/**
	 * Stop the active 
	 */
	public stop() {
		if(this.httpServer) this.httpServer.close();
	}

	/**
	 * Called to setup routes on the given express app
	 * 
	 * @param app The express app
	 */
	private setupRouting(app: Application) {
		const distDir = path.join(__dirname, 'dist');
		const publicDir = path.join(__dirname, 'public');

		// Statically serve all distribution files and public files
		app.use(express.static(distDir));
		app.use(express.static(publicDir));

		// Configure API routes
		const apiRouter = Router();

		setupCoreRoutes(apiRouter);
		this.setupSocket(apiRouter);

		app.use('/api', apiRouter);
	}

	/**
	 * Setup and configure the socket endpoint
	 * 
	 * @param router Router
	 */
	private setupSocket(router: WsRouter) {
		router.ws('/channel', (ws: WebSocket, req: Request) => {
			ws.on
		});
	}

}