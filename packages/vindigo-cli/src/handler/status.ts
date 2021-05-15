import chalk from "chalk";
import consola from "consola";
import dayjs from "dayjs";
import pm2, { ProcessDescription } from 'pm2';
import { bytesToSize, SCRIPT_NAME } from "../util";

export function handleStatus() {
	pm2.connect((err: any) => {
		if(err) {
			consola.error('Could not connect to pm2: ', err);
    		process.exit(0);
		}

        pm2.describe(SCRIPT_NAME, (err: any, list: ProcessDescription[]) => {
            if(err) {
                consola.error('Failed to locate process: ' + err);
    		    process.exit(0);
            } else if(!list.length || list[0].pm2_env!.status != 'online') {
                consola.info('Vindigo is not currently running');
    		    process.exit(0);
            }

            const proc = list[0];
            const monitor = proc.monit!;
            const uptime = Date.now() - (proc.pm2_env!.pm_uptime || 0);
            const lifetime = dayjs.duration(uptime, 'ms').humanize();

            consola.info('Vindigo is up and running!\n');
            consola.info(chalk`Memory: {cyanBright ${bytesToSize(monitor.memory || 0)}}`);
            consola.info(chalk`Cpu:    {cyanBright ${monitor.cpu}%}`);
            consola.info(chalk`Uptime: {cyanBright ${lifetime}}`);

            pm2.disconnect();
        });
	});
}