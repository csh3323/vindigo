import chalk from "chalk";
import consola from "consola";
import pm2, { ProcessDescription, StartOptions } from 'pm2';
import { assertInWorkingDirectory, assertServerDist, ENTRYPOINT, SCRIPT_NAME } from "../util";

export function handleStart() {
	assertInWorkingDirectory();
	assertServerDist();
	
	pm2.connect((err: any) => {
		if(err) {
			consola.error('Could not connect to pm2: ', err);
			process.exit(0);
		}

		pm2.describe(SCRIPT_NAME, (_: any, proc: ProcessDescription[]) => {
			if(proc.length && proc[0].pm2_env!.status == 'online') {
				consola.info('Vindigo is already running!');
				process.exit(0);
			}

			consola.info('Starting Vindigo daemon...');

			pm2.start({
				script: ENTRYPOINT,
				name: SCRIPT_NAME,
				autorestart: false
			} as StartOptions, (err: any) => {
				if(err) {
					consola.error('Could not start process: ', err);
					process.exit(0);
				}

				consola.success('Successfully started Vindigo');
				consola.info(chalk`- Use {cyanBright vindigo status} to view process information`);
				consola.info(chalk`- Use {cyanBright vindigo stop} to terminate vindigo`);
				
				pm2.disconnect();
			});
		});
	});
}