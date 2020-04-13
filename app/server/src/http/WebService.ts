import { TeleboardServer } from '../bootstrap/TeleboardServer';
import setupWs, { Router as WsRouter } from 'express-ws';
import express, { Router, Application, Request, Response, RequestHandler } from 'express';
import { setupCoreRoutes } from './Router';
import bodyParser from 'body-parser';
import { Logger } from 'winston';
import { Server } from 'http';
import WebSocket from 'ws';
import path from 'path';
import fs from 'fs';

/**
 * The WebService class is responsible for managing
 * and holding all HTTP connections and related
 * assets.
 */
export class WebService {

	public readonly app: TeleboardServer;
	public readonly server: Application;

	/** The logger instance */
	public logger!: Logger;

	/** True when the service is active */
	private running: boolean = false;

	/** The  low level server instance */
	private httpServer?: Server;

	public constructor(app: TeleboardServer) {
		this.app = app;
		this.server = express();

		// Inject web socket functionality
		setupWs(this.server);
	}

	/**
	 * Start the web server and bind to the port defined
	 * in the Teleboard config
	 */
	public start() {
		if(this.running) return;
		this.running = true;

		this.logger = this.app.getLogger('WebService');
		this.logger.info('Configuring internal web server...');

		const port = this.app.config.web.port;
		
		// Setup the routes
		this.registerRouters(this.server);

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
	 * Stop the active WebService
	 */
	public stop() {
		if(!this.running) return;

		if(this.httpServer) {
			this.httpServer.close();
		}

		this.running = false;
	}

	/**
	 * Called to setup essential routers on the given
	 * express application instance.
	 * 
	 * @param app The express app
	 */
	private registerRouters(app: Application) {
		const distDir = path.join(__dirname, '../../../dist/client');
		const publicDir = path.join(__dirname, 'public');
		const staticRouter = Router();
		const apiRouter = Router();

		// Validate the existence of dist
		if(!fs.existsSync(distDir)) {
			this.app.terminate();
			throw new Error('Failed to locate client distribution files');
		}

		// Configure the static router
		staticRouter.use(
			express.static(publicDir),							// Load from /public
			express.static(distDir),							// Load client dist
			({res}) => res!.sendFile(distDir + '/index.html')	// Fallback to index html
		);

		// Configure the API router
		setupCoreRoutes(this, apiRouter);
		this.setupSocket(apiRouter);

		// Register the router
		app.use('/api', bodyParser.json(), apiRouter);
		app.use('/', staticRouter)
	}

	/**
	 * Setup and configure the socket endpoint for
	 * live updates.
	 * 
	 * @param router Router
	 */
	private setupSocket(router: WsRouter) {
		router.ws('/channel', (ws: WebSocket) => {
			ws.on
		});
	}

}