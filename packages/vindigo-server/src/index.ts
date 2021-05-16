import { VindigoServer } from "./server";
import ON_DEATH from 'death';
import consola from "consola";
import dotenv from 'dotenv';
import { resolve } from "path";

// Load environment variables
dotenv.config();

// Instantiate the Vindigo server and make it public
// to the entire app.
const vindigo = new VindigoServer();
export { vindigo };

// Start the server and handle exit signals
try {
	vindigo.start();

	ON_DEATH(() => {
		vindigo.stop();
	});
} catch(err) {
	consola.error(err);
	process.exit(1);
}
