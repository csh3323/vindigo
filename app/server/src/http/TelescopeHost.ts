import { TelescopeServer } from '../bootstrap/TelescopeServer';
import setupWs, { Router as WsRouter } from 'express-ws';
import express, { Router, Application, Request, Response, RequestHandler } from 'express';
import { setupCoreRoutes } from './Router';
import { Channel } from './Channel';
import { Logger } from 'winston';
import { Server } from 'http';
import path from 'path';
import WebSocket from 'ws';
import bodyParser from 'body-parser';
import { Controller } from './Controller';
import { UserProfile } from 'auth/User';
import { HttpStatus } from 'common/Statuses';

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
	 * Stop the active 
	 */
	public stop() {
		if(this.httpServer) this.httpServer.close();
	}

	/**
	 * Called to setup essential routers on the given
	 * express application instance.
	 * 
	 * @param app The express app
	 */
	private registerRouters(app: Application) {
		const distDir = path.join(__dirname, 'dist');
		const publicDir = path.join(__dirname, 'public');
		const staticRouter = Router();
		const apiRouter = Router();

		// Configure the static router
		staticRouter.use(
			express.static(distDir),
			express.static(publicDir)
		);

		// Configure the API router
		setupCoreRoutes(this, apiRouter);
		this.setupSocket(apiRouter);

		// Register the router
		app.use('/', staticRouter)
		app.use('/api', bodyParser.json(), apiRouter);
	}

	/**
	 * Setup and configure the socket endpoint for
	 * live updates.
	 * 
	 * @param router Router
	 */
	private setupSocket(router: WsRouter) {
		router.ws('/channel', (ws: WebSocket, req: Request) => {
			ws.on
		});
	}

	/**
	 * Connect the given controller instance to a
	 * valid RequestHandler which can be passed
	 * into route handlers.
	 * 
	 * @param controller The controllers
	 * @returns RequestHandler
	 */
	public connect(controller: Controller) : RequestHandler {
		return (req, res) => {
			let user: UserProfile|undefined;

			// TODO Implement token retrieval
			user = new UserProfile("not implemented");

			// Authorize the call and respond with 401 Unauthorized
			// when the user is not currently logged in, and with
			// 403 Forbidden when the user lacks permission.
			if(!controller.authorize(req, user)) {
				res.sendStatus(user ? HttpStatus.Forbidden : HttpStatus.Unauthorized);
				return; 
			}

			const reqBody = req.body || {};

			// Validate the request payload using the Json Schema
			// specified by the controller.
			const reqResult = controller.schema().validate(reqBody);

			if(!reqResult.isValid) {
				res.status(HttpStatus.BadRequest).json(reqResult.reasons);
				return; 
			}

			// Forward the request and response handles to the
			// controller handle method for further processing.
			controller.handle(req, res);
		};
	}

}