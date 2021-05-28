import { IServerConfig } from "./util/config";

/**
 * The service in charge of managing routing 
 */
export class ExtensionService {

	private config: IServerConfig;

	public constructor(config: IServerConfig) {
		this.config = config;
	}

}