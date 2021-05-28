import { basename, dirname, join } from 'path';
import { existsSync, mkdirSync, readFileSync, readSync, writeFileSync } from 'fs';

import chalk from 'chalk';
import consola from 'consola';
import inquirer from 'inquirer';

const DEFAULT_CONFIG = join(__dirname, '../../config.default.toml');
const ACTUAL_CONFIG = './data/config.toml';

export async function handleInit(args: any) {
	const shouldReset = !!args.force;

	if(!existsSync(DEFAULT_CONFIG)) {
		consola.error('Failed to locate default config');
		return;
	}

	if(!shouldReset && existsSync(ACTUAL_CONFIG)) {
		consola.info(chalk`This Vindigo installation is already configured`);
		consola.info(chalk`Use {cyanBright --force} to overwrite your existing config`);
		return;
	}

	consola.info('Welcome to the Vindigo setup utility!');
	consola.info(chalk`Answer the following questions to complete the setup`);

	const values: any = await inquirer.prompt([
		{
			name: 'URL',
			message: 'How will users access Vindigo?',
			type: 'input',
			default: 'https://example.com/'
		},
		{
			name: 'PORT',
			message: 'What port should Vindigo run on?',
			type: 'number',
			default: 8085
		},
		{
			name: 'NAME',
			message: 'How do you want to call your installation?',
			type: 'input',
			default: 'Vindigo'
		},
		{
			name: 'DB_DRIVER',
			message: 'Choose database driver',
			type: 'list',
			default: 'MySQL',
			choices: [
				{ name: 'MySQL', value: 'mysql'},
				{ name: 'PostgreSQL', value: 'postgresql'},
				{ name: 'SQLite', value: 'sqlite'}
			]
		},
		{
			name: 'DB_HOSTNAME',
			message: 'Database hostname',
			type: 'input',
			when: (q: any) => q.DB_DRIVER != 'sqlite',
			default: '127.0.0.1'
		},
		{
			name: 'DB_PORT',
			message: 'Database port',
			type: 'number',
			when: (q: any) => q.DB_DRIVER != 'sqlite',
			default: (q: any) => q.DB_DRIVER == 'mysql' ? 3306 : 5432
		},
		{
			name: 'DB_USERNAME',
			message: 'Database username',
			type: 'input',
			when: (q: any) => q.DB_DRIVER != 'sqlite'
		},
		{
			name: 'DB_PASSWORD',
			message: 'Database password',
			type: 'input',
			when: (q: any) => q.DB_DRIVER != 'sqlite'
		},
		{
			name: 'DB_PASSWORD',
			message: 'Database password',
			type: 'input',
			when: (q: any) => q.DB_DRIVER != 'sqlite'
		},
		{
			name: 'DB_NAME',
			message: 'Database name',
			type: 'input',
			when: (q: any) => q.DB_DRIVER != 'sqlite',
			default: 'vindigo'
		},
		{
			name: 'DB_PATH',
			message: 'SQLite path',
			type: 'input',
			default: 'data/database.sqlite',
			when: (q: any) => q.DB_DRIVER == 'sqlite'
		}
	]);

	values['GEN_DATE'] = new Date().toString();
	
	const defaultConfig = readFileSync(DEFAULT_CONFIG, 'utf-8');
	const replacements: any = Object.fromEntries(Object.entries(values).map(([k, v]) => [`%${k}%`, v]));
	const finalConfig = defaultConfig.replace(/%\w+%/g, (match) => replacements[match] ?? ((match == '%DB_PORT%') ? '0' : ''));
	const parentDir = basename(dirname(ACTUAL_CONFIG));

	mkdirSync(parentDir, { recursive: true });
	writeFileSync(ACTUAL_CONFIG, finalConfig);

	consola.success(chalk`Successfully generated the configuration file ({yellow ${parentDir}/config.toml})`);
	consola.success(chalk`Use {cyanBright vindigo start} to start the Vindigo server`);
}