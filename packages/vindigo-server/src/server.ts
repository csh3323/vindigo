import consola from "consola";

/**
 * The main Vindigo server manager
 */
export class VindigoServer {

	public start() {
		consola.info("Starting Vindigo server");

		setTimeout(() => 0, 1000000);
	}

	public stop() {
		consola.info("Stopping Vindigo server");
		process.exit(0);
	}

}