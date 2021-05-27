import { copyFileSync, existsSync, readFileSync } from 'fs';

import chalk from 'chalk';
import consola from 'consola';
import { join } from 'path';

export function handleConfig(args: any) {
	const actualConfig = join(__dirname, '../../../../config.toml');
	const defaultConfig = join(__dirname, '../../default_config.toml');
	const shouldReset = !!args.reset;

	if(!existsSync(defaultConfig)) {
		consola.error('Failed to locate default config');
		return;
	}

	if(!shouldReset && existsSync(actualConfig)) {
		consola.info(chalk`You already have a {yellow config.toml} file`);
		consola.info(chalk`Use {cyanBright --reset} to overwrite your existing config`);
		return;
	}

	copyFileSync(defaultConfig, actualConfig);

	consola.success(chalk`Successfully generated {yellow config.toml}, you can now use your editor of choice to further configure your Vindigo installation`);
}