import { Consola } from "consola";
import waitOn from "wait-on";

const awaitableDatabases: string[] = [
	'mysql',
	'postgres'
];

/**
 * Throw the given error. Useful in combination with
 * the nullish coalescing operator.
 * 
 * @param type The error type
 */
export function elseThrow(err: Error): never {
	throw err;
}

/**
 * Returns whether the current environment is
 * running in production mode.
 * 
 * @returns True if production
 */
export function isProduction(): boolean {
	return process.env.NODE_ENV == 'production';
}

/**
 * Await a connection to the database or exit with a user error
 * 
 * @param logger The logger instance
 * @param options Database options
 */
export async function pollDatabase(logger: Consola, options: {driver: string, hostname: string, port: number}) {
	if(awaitableDatabases.includes(options.driver)) {
		const connection = `${options.hostname}:${options.port}`;

		try {
			await waitOn({
				timeout: 10_000,
				resources: [
					`tcp:${connection}`
				]
			});
		} catch(er) {
			logger.error(`Failed to connect to database ${connection}`);
			process.exit(0);
		}
	}
}