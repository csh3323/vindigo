import consola from "consola";
import pm2, { Proc, ProcessDescription } from 'pm2';
import { ENTRYPOINT, SCRIPT_NAME } from "../util";

export function handleStop() {
	pm2.connect((err: any) => {
		if(err) {
			consola.error('Could not connect to pm2: ', err);
			process.exit(0);
		}

		pm2.describe(SCRIPT_NAME, (_: any, proc: ProcessDescription[]) => {
			if(!proc.length || proc[0].pm2_env!.status != 'online') {
				consola.info('Vindigo is not currently running');
				process.exit(0);
			}

			consola.info('Stopping Vindigo daemon...');

			pm2.stop(ENTRYPOINT, (err: any) => {
				if(err) {
					consola.error('Could not stop process: ', err);
					process.exit(0);
				}
	
				consola.success('Successfully terminated Vindigo');
				pm2.disconnect();
			});
		});
	});
}