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
	const config = join(__dirname, '../../../config.toml');

	if(!existsSync(config)) {
		consola.error(chalk`Missing {yellow config.toml}. Use {cyanBright ./vindigo config} to generate your configuration file`);
		process.exit(0);
	}
}