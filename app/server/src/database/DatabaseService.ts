import { Logger } from "winston";
import { TeleboardServer } from "../bootstrap/TeleboardServer";
import { TeleboardError } from "../common/Exceptions";
import { Model } from 'objection';
import Knex, { Config } from 'knex';
import path from "path";

/**
 * The DatabaseService class is responsible for managing
 * the connection(s) to the database backend, the schema
 * migrations, and the data model.
 */
export class DatabaseService {

	public readonly logger: Logger;
	public readonly app: TeleboardServer;

	/** The Sequelize connection instance */
	private instance: Knex

	public constructor(app: TeleboardServer) {
		this.app = app;
		this.logger = app.getLogger('DatabsaseService');

		// Detect the requested driver
		const config = app.config.database;
		const options: Config = {
			debug: process.env.NODE_ENV == 'development',
			log: {
				warn: (msg) => {
					this.logger.warn(msg);
				},
				error: (msg) => {
					this.logger.error(msg);
				},
				debug: (msg) => {
					this.logger.debug(msg);
				},
				deprecate: (msg) => {
					this.logger.warn('deprecate: ' + msg);
				}
			},
			pool: {
				min: 1,
				max: 5
			},
			migrations: {
				tableName: this.tableName('migrations'),
				directory: path.join(__dirname, './migrations'),
				stub: path.join(__dirname, './MigrationStub.ts'),
				extension: 'ts'
			}
		};

		// Load the correct database details
		switch(config.driver) {
			case 'sqlite': {
				options.client = 'sqlite3'
				options.connection = {
					filename: app.getDataFile('database.sqlite')
				};
				break;
			}
			case 'postgres': {
				options.dialect = 'pg';
				options.connection = this.buildConnection(app);
			}
			case 'mysql': {
				options.dialect = 'mysql';
				options.connection = this.buildConnection(app);
			}
			default: {
				throw new TeleboardError('Unknown database driver ' + config.driver);
			}
		}

		// Create the knex instance
		this.instance = Knex(options);

		// Setup the model
		Model.knex(this.instance);
	}

	/**
	 * Build a connection configuration for Knex
	 * 
	 * @param app TeleboardApp
	 */
	private buildConnection(app: TeleboardServer) : object {
		const db = app.config.database;

		return {
			host: db.hostname,
			user: db.username,
			password: db.password,
			database: db.name
		}
	}

	/**
	 * Connect to the database and validate the
	 * connection params.
	 */
	public start() {
		if(!this.app.options.isInCLI) {
			this.logger.info('Configured database driver for ' + this.app.config.database.driver);	
		}

		this.validate().then(success => {
			if(!this.app.options.isInCLI) {
				if(success) {
					this.logger.info('Successfully authenticated with database');
				} else {
					this.logger.error('Failed database setup');
				}
			}

			if(!success) {
				this.app.terminate();
			}
		});
	}

	/**
	 * Stop the active DatabaseService
	 */
	public stop() {
		this.knex.destroy();
	}

	/**
	 * Validate the database connection
	 * 
	 * @returns Boolean promise
	 */
	private async validate() : Promise<boolean> {
		try {
			await this.knex.raw('select 1+1 as result');
			return true;
		} catch (err) {
			this.logger.error('Failed validation: ', err.message);
			return false;
		}
	}

	/**
	 * Prefixes the given table name with the table prefix
	 * 
	 * @param name The table
	 */
	public tableName(name: string) : string {
		return (this.app.config.database.prefix || '') + name;
	}

	/**
	 * Returns the underlying Knex instance
	 * 
	 * @returns Knex instance
	 */
	public get knex() : Knex {
		return this.instance;
	}

}

/**
 * Instantiate a new teleboard instance
 * to obtain the table prefix.
 * 
 * @readonly 
 */
export function getTablePrefix(table: string) : string {
	const teleboard = new TeleboardServer({isInCLI: true});

	try {
		return teleboard.config.database.prefix + table;
	} finally {
		teleboard.terminate();
	}
}