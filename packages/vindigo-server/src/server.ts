import consola, { Consola } from "consola";
import { config, ConfigProperty } from "./util/config";

const TEST_PROPERTY = new ConfigProperty('TEST', 'kaas');

/**
 * The main Vindigo server manager
 */
export class VindigoServer {

	/** The root logger */
	public logger: Consola = consola

	// /** The prisma client instance */
	// public prisma!: PrismaClient;

	public start() {
		consola.info("Starting Vindigo server");

		consola.info(config(TEST_PROPERTY));
	}

	public stop() {
		consola.info("Stopping Vindigo server");
		process.exit(0);
	}

}