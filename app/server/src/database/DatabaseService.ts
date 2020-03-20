import { Logger } from "winston";
import { TelescopeServer } from "../bootstrap/TelescopeServer";

/**
 * The DatabaseService class is responsible for managing
 * the connection(s) to the database backend, the schema
 * migrations, and the data model.
 */
export class DatabaseService {

	public readonly logger: Logger;
	public readonly app: TelescopeServer;

	public constructor(app: TelescopeServer) {
		this.app = app;
		this.logger = app.getLogger('DatabsaseService');
	}

	

}