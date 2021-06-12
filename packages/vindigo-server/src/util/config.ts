import { merge } from 'lodash';
import { parse } from 'toml';
import { readFileSync } from 'fs';

/**
 * The Vindigo Server configuration
 */
export interface IServerConfig {
	general: {
		url: string,
		hostname: string,
		port: number,
		maintenance: boolean,
		check_version: boolean,
		name: string,
		debug: boolean
	},
	http: {
		jwt_secret_key: string
	},
	smtp: {
		enabled: boolean,
		address: string,
		domain: string,
		user_name: string,
		password: string,
		port: number
	},
	database: {
		driver: string,
		hostname: string,
		username: string,
		password: string,
		database: string,
		port: number,
		path: string
	}
}

// The default config is used as fallback when
// the user config is missing fields.
const defaultConfig: IServerConfig = {
	general: {
		url: '',
		hostname: '127.0.0.1',
		port: 8085,
		maintenance: false,
		check_version: true,
		name: 'Vindigo',
		debug: false
	},
	http: {
		jwt_secret_key: 'vindigo_jwt'
	},
	smtp: {
		enabled: false,
		address: '',
		domain: '',
		user_name: '',
		password: '',
		port: 25
	},
	database: {
		driver: 'mysql',
		hostname: '',
		username: '',
		password: '',
		database: 'vindigo',
		port: 3306,
		path: 'data/database.sqlite'
	}
};

/**
 * Read the server config into memory
 * 
 * @returns The config
 */
export function readConfig(): IServerConfig {
	const config = parse(readFileSync('data/config.toml', 'utf-8'));

	return merge(defaultConfig, config);
}