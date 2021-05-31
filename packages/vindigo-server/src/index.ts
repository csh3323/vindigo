import { DatabaseService } from "./database/service";
import { ExtensionService } from "./extensions";
import { HTTPService } from "./http/service";
import ON_DEATH from 'death';
import consola from "consola";
import { readConfig } from "./util/config";

// Assert CLI bootstrap
if(process.env.VINDIGO_CLI !== 'true') {
	throw new Error('Vindigo Server must be launched from the CLI');
}

const config = readConfig();
const logger = consola.create({});

// Define the services
const extensions = new ExtensionService(config);
const database = new DatabaseService(config);
const http = new HTTPService(config);

export {
	extensions,
	database,
	logger,
	http
};

// Start the HTTP service in order to serve
// the vindigo client and API endpoints.
http.start();

// Listen to application termination
ON_DEATH(() => {
	http.stop();
});