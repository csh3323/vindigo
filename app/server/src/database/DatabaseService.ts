import { Logger } from "winston";
import { TelescopeServer } from "../bootstrap/TelescopeServer";
import { TelescopeError } from "../common/Exceptions";
import Knex, {Config as KnexConfig, QueryBuilder, Raw} from 'knex';

/**
 * The DatabaseService class is responsible for managing
 * the connection(s) to the database backend, the schema
 * migrations, and the data model.
 */
export class DatabaseService {

	public readonly logger: Logger;
	public readonly app: TelescopeServer;

	/** The Sequelize connection instance */
	private instance: Knex

	public constructor(app: TelescopeServer) {
		this.app = app;
		this.logger = app.getLogger('DatabsaseService');

		// Detect the requested driver
		const config = app.config.database;
		const options: KnexConfig = {
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
				throw new TelescopeError('Unknown database driver ' + config.driver);
			}
		}

		// Create the knex instance
		this.instance = Knex(options);
	}

	/**
	 * Build a connection configuration for Knex
	 * 
	 * @param app TelescopeApp
	 */
	private buildConnection(app: TelescopeServer) : object {
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
		this.validate().then(success => {
			if(success) {
				this.logger.info('Successfully authenticated with database');
			} else {
				this.logger.error('Failed database setup');
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
	 * Returns a Knex.js query builder for the given table
	 * 
	 * @returns QueryBuilder
	 */
	public query(table: string) : QueryBuilder {
		return this.instance(table);
	}

	/**
	 * Utility callback for easy use of the provided knex
	 * instance
	 * 
	 * @param cb Callback receiving the knex instance
	 */
	public build(cb: (knex: Knex) => void) {
		cb(this.instance);
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