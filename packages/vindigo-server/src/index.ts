import { DatabaseService } from "./database";
import { ExtensionService } from "./extensions";
import { HTTPService } from "./http";
import ON_DEATH from 'death';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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