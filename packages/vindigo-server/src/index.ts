import { DatabaseService } from "./database";
import { ExtensionService } from "./extensions";
import { HTTPService } from "./http";
import ON_DEATH from 'death';
import { readConfig } from "./util/config";

// Assert CLI bootstrap
if(process.env.VINDIGO_CLI !== 'true') {
	throw new Error('Vindigo Server must be launched from the CLI');
}

const config = readConfig();

// Define the services
const extensions = new ExtensionService(config);
const database = new DatabaseService(config);
const http = new HTTPService(config);

export {
	extensions,
	database,
	http
};

console.log(config);

// Listen to application termination
ON_DEATH(() => {
	
});