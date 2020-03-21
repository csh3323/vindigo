import { Logger } from "winston";
import { TelescopeServer } from "../bootstrap/TelescopeServer";
import { Sequelize, Dialect, Options } from 'sequelize';
import { TelescopeError } from "../common/Exceptions";

/**
 * The DatabaseService class is responsible for managing
 * the connection(s) to the database backend, the schema
 * migrations, and the data model.
 */
export class DatabaseService {

	public readonly logger: Logger;
	public readonly app: TelescopeServer;

	/** The Sequelize connection instance */
	public readonly connection: Sequelize;

	public constructor(app: TelescopeServer) {
		this.app = app;
		this.logger = app.getLogger('DatabsaseService');

		// Detect the requested driver
		const {driver, hostname, username, password, port, name} = app.config.database;
		const options: Options = {
			logging: (msg) => this.logger.debug(msg)
		};
	
		// Load the correct database details
		if(driver == 'sqlite') {
			options.dialect = 'sqlite';
			options.storage = app.getDataFile('database.sqlite');
		} else if(driver == 'postgres' || driver == 'mariadb' || driver == 'mysql') {
			options.dialect = driver;
			options.username = username;
			options.password = password;
			options.database = name;
			options.host = hostname;
			options.port = port;
		} else {
			throw new TelescopeError('Unknown database driver ' + driver);
		}

		// Setup the sequelize instance
		this.connection = new Sequelize(options);
	}

	/**
	 * Connect to the database and validate the
	 * connection params.
	 */
	public start() {
		this.connection.authenticate().then(() => {
			this.logger.info('Successfully authenticated with database');
		});
	}

	/**
	 * Stop the active DatabaseService
	 */
	public stop() {
		this.connection.close();
	}

}