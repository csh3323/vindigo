import { Connection, createConnection } from "typeorm";

import { IServerConfig } from "../util/config";
import { User } from "./model/user";
import { logger } from "..";

/**
 * The service used to connect to the database
 */
export class DatabaseService {

	private config: IServerConfig;
	private connection: Connection;

	public constructor(config: IServerConfig) {
		this.config = config;
	}

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
				database: options.database || options.path,
				entities: [User]
			});
		} catch (err) {
			logger.error('Error instantiating database connection: ' + err.message);
		}
	}

}