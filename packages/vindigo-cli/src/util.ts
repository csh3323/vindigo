import chalk from 'chalk';
import consola from 'consola';
import { existsSync } from 'fs';
import { join } from 'path';

export const ENTRYPOINT = join(__dirname, '../../vindigo-server/dist/index.js');
export const SCRIPT_NAME = 'Vindigo Server';

/**
 * Format a filesize amount
 * 
 * @param bytes Amount of bytes
 * @returns String
 */
export function bytesToSize(bytes: number) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '');
	return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

/**
 * Assert the existence of server dist files
 */
export function assertServerDist() {
	if(!existsSync(ENTRYPOINT)) {
		consola.info(chalk`Server files are missing, use {cyanBright yarn build} to build the server files first`);
		process.exit(0);
	}
}