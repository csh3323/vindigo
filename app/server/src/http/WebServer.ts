import express, { Application, Request, Response } from 'express';
import { TelescopeServer } from '../bootstrap/TelescopeServer';
import { Server } from 'http';
import { Logger } from 'winston';

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

		// Register all routes
		this.http.get('/', (req, res) => {
			res.send('Hello Worlderietus');
		});

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
	 * Stop the active 
	 */
	public stop() {
		if(this.internal) this.internal.close();
	}

}