import { DatabaseService } from "./database";
import { ExtensionService } from "./extensions";
import { HTTPService } from "./http";
import ON_DEATH from 'death';
import consola from "consola";
import { readConfig } from "./util/config";
import { registerModels } from "./registry/models";
import { registerSchemas } from "./registry/schemas";

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
	config,
	extensions,
	database,
	logger,
	http
};

registerModels();
registerSchemas();

(async () => {
	await database.start();
	await http.start();
})();

// Listen to application termination
ON_DEATH(() => {
	http.stop();
	process.exit(0);
});