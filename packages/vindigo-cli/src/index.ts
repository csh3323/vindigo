import dayjs from 'dayjs';
import yargs from 'yargs';
import { handleStart } from './handler/start';
import { handleStatus } from './handler/status';
import { handleStop } from './handler/stop';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

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
        handler: () => 0
    })
    .command({
        command: 'config',
        describe: 'Display the Teleboard config',
        handler: () => 0
    })
    .command({
        command: 'compile',
        describe: 'Build & test the teleboard server and client',
        handler: () => 0
    })
    .command({
        command: 'migrate:make <name>',
        describe: 'Create a new migration file',
        handler: () => 0,
        builder: (yargs: any) => {
            return yargs.positional('name', {
                describe: 'The name of the migration'
            });
        }
    })
    .command({
        command: 'migrate:status',
        describe: 'Query the migration status',
        handler: () => 0
    })
    .command({
        command: 'migrate:update',
        describe: 'Execute all remaining migrations',
        handler: () => 0
    })
    .command({
        command: 'migrate:next',
        describe: 'Execute the next migration',
        handler: () => 0
    })
    .command({
        command: 'migrate:rollback',
        describe: 'Undo the previous migration',
        handler: () => 0,
        builder: (yargs) => {
            return yargs.option('all', {
                alias: 'a',
                describe: 'Rollback all migrations',
                type: 'boolean'
            });
        }
    })
    .help()
    .demandCommand()
    .strict()
    .parse()