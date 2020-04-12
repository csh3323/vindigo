import {TeleboardServer} from './bootstrap/TeleboardServer';
import { createLogger, transports, format } from 'winston';
import {execSync} from 'child_process';
import moment from 'moment';
import path from 'path';
import pm2 from 'pm2';
import fs from 'fs';
import yargs from 'yargs';

// Define colors
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

// Utility to convert memory sizes
function bytesToSize(bytes: number) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '');
	return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

(function() {
	const teleboard = new TeleboardServer({isInCLI: true});
	const mainFile = path.join(__dirname, './main.js');
	const logger = createLogger({
		level: 'debug',
		transports: [

			// Log a simple message to the console
			new transports.Console({
				format: format.combine(
					format.colorize(),
					format.printf(info => {
						return `> ${info.level}: ${info.message}`;
					})
				)
			})

		]
	})

	// Start the database service
	teleboard.database.start();

	// Find the latest applied migration
	async function getCurrent() {
		const migrator = teleboard.database.knex.migrate;
		const list = await migrator.list();
		const completed = list[0];

		if(completed.length < 1) return 'none'

		const latest = completed[completed.length - 1];

		return latest.substring(latest.indexOf('_') + 1);
	}

	// Launch teleboard with pm2
	function startTeleboard() {
		const handleErr = (err: any) => {
			if(!err) return false;
			
			logger.error('Error during daemon initialization: ', err);
			teleboard.terminate();
			pm2.disconnect();
			return true;
		}

		logger.info('Received startup request...');

		pm2.connect((err) => {
			if(handleErr(err)) return;

			logger.info('Starting teleboard daemon...');

			pm2.start(mainFile, (err, proc) => {
				if(err) {
					if(err.toString().startsWith('Error: Script already launched')) {
						logger.warn('Teleboard is already running!');
						teleboard.terminate();
						pm2.disconnect();
						return;
					} else {
						if(handleErr(err)) return;
					}
				}

				pm2.describe((proc as any)[0]['pm_id'], (err, desc) => {
					if(handleErr(err)) return;

					logger.info('Successfully started Teleboard');
					logger.info('- Use '+CYAN+'teleboard status'+RESET+' to view process information');
					logger.info('- Use '+CYAN+'teleboard stop'+RESET+' to terminate teleboard');
					
					teleboard.terminate();
					pm2.disconnect();
				});
			});
		});
	}

	// Stop the active teleboard process
	function stopTeleboard() {
		const handleErr = (err: any) => {
			if(!err) return false;
			
			logger.error('Error during daemon connection: ', err);
			teleboard.terminate();
			pm2.disconnect();
			return true;
		}

		pm2.connect((err) => {
			if(handleErr(err)) return;

			pm2.list((err, res) => {
				if(handleErr(err)) return;

				let theProc = null;
				
				res.forEach(proc => {
					if(proc.pm2_env!.pm_exec_path == mainFile) {
						theProc = proc;
					}
				});

				if(theProc && (theProc['pm2_env'] as any).status == 'online') {
					const id = theProc['pm_id'];

					pm2.stop(id, (err) => {
						if(handleErr(err)) return;

						logger.info('Successfully terminated Teleboard');
						teleboard.terminate();
						pm2.disconnect();
					});
				} else {
					logger.warn('Teleboard is not currently running');
					teleboard.terminate();
					pm2.disconnect();
				}
			});
		});
	}

	// Print out the daemon status
	function showStatus() {
		const handleErr = (err: any) => {
			if(!err) return false;
			
			logger.error('Error during daemon connection: ', err);
			teleboard.terminate();
			pm2.disconnect();
			return true;
		}

		pm2.connect((err) => {
			if(handleErr(err)) return;

			pm2.list((err, res) => {
				if(handleErr(err)) return;

				let theProc = null;
				
				res.forEach(proc => {
					if(proc.pm2_env!.pm_exec_path == mainFile) {
						theProc = proc;
					}
				});

				if(theProc && (theProc['pm2_env'] as any).status == 'online') {
					const monitor = (theProc as any).monit;
					const uptime = Date.now() - (theProc['pm2_env'] as any).created_at;

					logger.info('Teleboard is up and running!');
					logger.info('');
					logger.info('Memory: ' + CYAN + bytesToSize(monitor.memory) + RESET);
					logger.info('Cpu:    ' + CYAN + monitor.cpu + '%' + RESET);
					logger.info('Uptime: ' + CYAN + moment.duration(uptime).humanize() + RESET);
				} else {
					logger.warn('Teleboard is not currently running');
				}

				teleboard.terminate();
				pm2.disconnect();
			});
		});
	}

	// Start the Teleboard server in the foreground
	function runTeleboard() {
		logger.info('Starting Teleboard as foreground process...')

		require(mainFile);
	}

	// Execute the server and client build commands
	function buildTeleboard() {
		const then = Date.now();

		logger.info('Compiling server and client files...');

		execSync('npm run build:server && npm run test:server && npm run build:client', {stdio: 'inherit'});

		const duration = Date.now() - then;

		logger.info('Server & Client compiling successful!'+GREEN+' ('+duration+'ms)'+RESET);
		logger.info('');
		logger.info('- Teleboard can now be started with'+CYAN+' teleboard start'+RESET);
		logger.info('- Run teleboard directly with'+CYAN+' teleboard run'+RESET);

		teleboard.terminate();
	}

	// Print out the config JSON
	function showConfig() {
		const productionConfig = path.join(__dirname, '../../data/config.json');
		const defaultConfig = path.join(__dirname, '../../data/config.default.json');

		if(fs.existsSync(productionConfig)) {
			console.log(fs.readFileSync(productionConfig, 'utf8'));
		} else {
			console.log(fs.readFileSync(defaultConfig, 'utf8'));
		}

		teleboard.terminate();
	}

	// Create a new migration file
	async function migrateMake(input: any) {
		const migrator = teleboard.database.knex.migrate;

		await migrator.make(input.name, {
			directory: path.join(__dirname, '../../app/server/src/database/migrations'),
			stub:  path.join(__dirname, '../../app/server/src/database/MigrationStub.ts'),
		});

		logger.info('Created new migration ' + CYAN + input.name);
		teleboard.terminate();
	}

	// Execute all remaining migrations
	async function migrateUpdate() {
		const migrator = teleboard.database.knex.migrate;
		const list = await migrator.list();

		if(list[1].length < 1) {
			logger.warn('Migrations already up-to-date');
		} else {
			const amount = list[1].length;

			await migrator.latest();

			logger.info('Executed ' + CYAN + amount + RESET + ' remaining migrations');
		}

		teleboard.terminate();
	}

	// Migrate the next migration
	async function migrateNext() {
		const migrator = teleboard.database.knex.migrate;
		const list = await migrator.list();

		if(list[1].length < 1) {
			logger.warn('Migrations already up-to-date');
		} else {
			await migrator.up();

			const current = await getCurrent();
			logger.info('Applied migration, now at ' + GREEN + current + RESET);
		}

		teleboard.terminate();
	}

	// Undo the previous migration
	async function migrateRollback() {
		const migrator = teleboard.database.knex.migrate;
		const list = await migrator.list();

		if(list[0].length < 1) {
			logger.warn('No migrations to rollback');
		} else {
			await migrator.down();

			const current = await getCurrent();
			logger.info('Applied migration, now at ' + GREEN + current + RESET);
		}

		teleboard.terminate();
	}

	// Handle the command input
	try {
		yargs
			.scriptName("teleboard")
			.usage('$0 <cmd> [options]')
			.command({
				command: 'start',
				describe: 'Launch the Teleboard server',
				handler: startTeleboard
			})
			.command({
				command: 'stop',
				describe: 'Terminate the Teleboard server',
				handler: stopTeleboard
			})
			.command({
				command: 'status',
				describe: 'Show the current daemon status',
				handler: showStatus
			})
			.command({
				command: 'run',
				describe: 'Start the Teleboard server in the foreground',
				handler: runTeleboard
			})
			.command({
				command: 'config',
				describe: 'Display the Teleboard config',
				handler: showConfig
			})
			.command({
				command: 'compile',
				describe: 'Build & test the teleboard server and client',
				handler: buildTeleboard
			})
			.command({
				command: 'migrate:make <name>',
				describe: 'Create a new migration file',
				handler: migrateMake,
				builder: (yargs: any) => {
					return yargs.positional('name', {
						describe: 'The name of the migration'
					});
				}
			})
			.command({
				command: 'migrate:update',
				describe: 'Execute all remaining migrations',
				handler: migrateUpdate
			})
			.command({
				command: 'migrate:next',
				describe: 'Execute the next migration',
				handler: migrateNext
			})
			.command({
				command: 'migrate:rollback',
				describe: 'Undo the previous migration',
				handler: migrateRollback
			})
			.help()
			.demandCommand()
			.strict()
			.parse()
	} catch(err) {
		teleboard.logger.error('Error caught in CLI');
		teleboard.logger.error(err);
		teleboard.terminate();
	}
})();