import { ENTRYPOINT, assertConfigExists, assertInWorkingDirectory, assertServerDist } from "../util";

import consola from "consola";

export function handleRun() {
	assertInWorkingDirectory();
	assertConfigExists();
	assertServerDist();
    
	consola.info('Starting Vindigo as foreground process...');

	try {
		require(ENTRYPOINT);
	} catch(err) {
		consola.error('Failed to start Vindigo server', err);
	}
}