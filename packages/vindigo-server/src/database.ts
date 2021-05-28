import { IServerConfig } from "./util/config";

/**
 * The service used to connect to the database
 */
export class DatabaseService {

	private config: IServerConfig;

	public constructor(config: IServerConfig) {
		this.config = config;
	}

}