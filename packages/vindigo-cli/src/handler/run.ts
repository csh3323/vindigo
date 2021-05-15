import consola from "consola";
import { assertServerDist, ENTRYPOINT } from "../util";

export function handleRun() {
    assertServerDist();
    
    consola.info('Starting Vindigo as foreground process...');

    try {
        require(ENTRYPOINT);
    } catch(err) {
        consola.error('Failed to start Vindigo server', err);
    }
}