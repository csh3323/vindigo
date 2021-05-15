import dayjs from 'dayjs';
import yargs from 'yargs';
import { handleStart } from './handler/start';
import { handleStatus } from './handler/status';
import { handleStop } from './handler/stop';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { handleRun } from './handler/run';
import { handleConfig } from './handler/config';

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
        describe: 'Start the Teleboard server in the foreground',
        handler: handleRun
    })
    .command({
        command: 'config',
        describe: 'Display the Teleboard config',
        handler: handleConfig
    })
    .help()
    .demandCommand()
    .strict()
    .parse()