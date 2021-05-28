import { DatabaseService } from "./database";
import { ExtensionService } from "./extensions";
import { HTTPService } from "./http";
import ON_DEATH from 'death';

// Assert CLI bootstrap
if(process.env.VINDIGO_CLI !== 'true') {
	throw new Error('Vindigo Server must be launched from the CLI');
}

// Define the services
const extensions = new ExtensionService();
const database = new DatabaseService();
const http = new HTTPService();

export {
	extensions,
	database,
	http
};

// Listen to application termination
ON_DEATH(() => {
	
});