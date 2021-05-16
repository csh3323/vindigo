import consola from "consola";

/**
 * The main Vindigo server manager
 */
export class VindigoServer {

	public start() {
		consola.info("Starting Vindigo server");

		consola.info(process.env.TEST);
	}

	public stop() {
		consola.info("Stopping Vindigo server");
		process.exit(0);
	}

}