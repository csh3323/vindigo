import express, { Application, Request, Response } from 'express';
import { TelescopeServer } from '../bootstrap/TelescopeServer';
import { setupRouter } from './Router';
import { Server } from 'http';
import { Logger } from 'winston';
import path from 'path';

export class TelescopeWebServer {

	public logger: Logger;
	public app: TelescopeServer;
	public http: Application;
	
	// The underlying http server
	private internal!: Server;

	public constructor(app: TelescopeServer) {
		this.app = app;
		this.http = express();
		this.logger = app.getLogger('Http');
	}

	/**
	 * Start the web server and bind to the port defined
	 * in the Telescope config
	 */
	public start() {
		const port = this.app.config.web.port;
		
		// Setup the routes
		this.setupRoutes(this.http);

		// Listen to all incoming GET requests
		this.internal = this.http.listen(port, (err) => {
			if(err) {
				this.logger.error('Failed to bind: ' + err);
				this.app.terminate();
				return;
			}

			this.logger.info('Successfully listening on port ' + port);
		});
	}

	/**
	 * Called to setup routes on the given express app
	 * 
	 * @param app The express app
	 */
	private setupRoutes(app: Application) {
		const distDir = path.join(__dirname, 'dist');
		const publicDir = path.join(__dirname, 'public');

		// Statically serve all distribution files and public files
		app.use(express.static(distDir));
		app.use(express.static(publicDir));

		// Configure API routes
		setupRouter(app);
	}

	/**
	 * Stop the active 
	 */
	public stop() {
		if(this.internal) this.internal.close();
	}

}