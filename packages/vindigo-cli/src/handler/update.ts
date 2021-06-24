import { ExecSyncOptions, execSync } from "child_process";

import { assertInWorkingDirectory } from "../util";
import chalk from "chalk";
import consola from "consola";

export async function handleUpdate() {
	assertInWorkingDirectory();

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const version = require('../../../../package.json').version;
	const opts: ExecSyncOptions = {stdio: 'inherit'};

	consola.info('Preparing to run update scripts');
	consola.info('You are running Vindigo ' + chalk.cyan('v' + version));

	try {
		consola.info(chalk.magentaBright('Updating dependencies (1/3)'));
		console.log('');
		execSync('yarn install', opts);
		console.log('');

		consola.info(chalk.magentaBright('Building distribution files (2/3)'));
		console.log('');
		execSync('yarn build', opts);
		console.log('');

		consola.info(chalk.magentaBright('Applying pending migrations (3/3)'));
		execSync('vindigo migrate:apply --all', opts);

		consola.success({
			message: 'Successfully executed update scripts',
			badge: true
		});
	} catch(err) {
		consola.error('Exception thrown during update process', err);
	}
}