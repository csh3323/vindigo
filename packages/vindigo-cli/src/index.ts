import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { handleInit } from './handler/init';
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
		command: 'init',
		describe: 'Configure your vindigo installation',
		builder: () => yargs.option('force', {
			alias: 'F',
			describe: 'Allow overriding of the existing config'
		}),
		handler: handleInit
	})
	.help()
	.demandCommand()
	.strict()
	.parse();