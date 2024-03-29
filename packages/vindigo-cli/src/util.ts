import chalk from 'chalk';
import consola from 'consola';
import { existsSync } from 'fs';
import { join } from 'path';
import { resolve } from 'path';

export const ENTRYPOINT = join(__dirname, '../../vindigo-server/dist/index.js');
export const SCRIPT_NAME = 'Vindigo Server';

/**
 * Format a filesize amount
 * 
 * @param bytes Amount of bytes
 * @returns String
 */
export function bytesToSize(bytes: number) {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '');
	return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

/**
 * Resolve a path in the resource directory
 * 
 * @param path The file path
 * @returns The full path
 */
export function getResource(path: string): string {
	return join(__dirname, '../resources/' + path);
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

/**
 * Assert the current directory is the vindigo root
 */
export function assertInWorkingDirectory() {
	if(process.cwd() != resolve(__dirname, '../../..')) {
		consola.error('This command can only be used from the vindigo directory');
		process.exit(0);
	}
}

/**
 * Assert the existence of the configuration file
 */
export function assertConfigExists() {
	if(!existsSync('./data/config.toml')) {
		consola.error(chalk`Missing configuration, use {cyanBright ./vindigo init} to generate the configuration file`);
		process.exit(0);
	}
}