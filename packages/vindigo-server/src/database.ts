import { BaseEntity, Connection, createConnection } from "typeorm";

import { IServerConfig } from "./util/config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { logger } from ".";

/**
 * The service used to connect to the database
 */
export class DatabaseService {

	private config: IServerConfig;
	private connection: Connection;
	private models: (typeof BaseEntity)[] = [];

	public constructor(config: IServerConfig) {
		this.config = config;
	}

	/**
	 * Start the Database Service and connect to
	 * the configured database.
	 */
	public async start() {

		// database config options
		const options = this.config.database;

		try {
			this.connection = await createConnection({
				type: options.driver as any,
				host: options.hostname,
				port: options.port,
				username: options.username,
				password: options.password,
				database: options.database,
				namingStrategy: new SnakeNamingStrategy(),
				entities: this.models,
			});
		} catch (err) {
			logger.error('Error instantiating database connection: ' + err.message);
		}
	}

	/**
	 * Define a new schema provider to insert further
	 * types and fields into the GraphQL schema.
	 * 
	 * @param provider The provider
	 */
	public defineModel(model: typeof BaseEntity) {
		this.models.push(model);
	}

}