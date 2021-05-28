import { IServerConfig } from "./util/config";

/**
 * The service in charge of serving http requests
 */
export class HTTPService {

	private config: IServerConfig;

	public constructor(config: IServerConfig) {
		this.config = config;
	}

}