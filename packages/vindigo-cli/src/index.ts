import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { handleConfig } from './handler/config';
import { handleRun } from './handler/run';
import { handleStart } from './handler/start';
import { handleStatus } from './handler/status';
import { handleStop } from './handler/stop';
import relativeTime from 'dayjs/plugin/relativeTime';
import yargs from 'yargs';

dayjs.extend(duration);
dayjs.extend(relativeTime);

yargs
	.scriptName("vindigo")
	.usage('$0 <cmd> [options]')
	.command({
		command: 'start',
		describe: 'Launch the Vindigo server',
		handler: handleStart
	})
	.command({
		command: 'stop',
		describe: 'Terminate the Vindigo server',
		handler: handleStop
	})
	.command({
		command: 'status',
		describe: 'Show the current daemon status',
		handler: handleStatus
	})
	.command({
		command: 'run',
		describe: 'Start the Vindigo server in the foreground',
		handler: handleRun
	})
	.command({
		command: 'config',
		describe: 'Generate the Vindigo configuration file',
		builder: () => yargs.option('reset', {
			describe: 'Reset your config to its default state'
		}),
		handler: handleConfig
	})
	.help()
	.demandCommand()
	.strict()
	.parse();