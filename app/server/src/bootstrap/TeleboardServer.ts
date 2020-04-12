import { Logger, createLogger, format, transports } from "winston";
import { DatabaseService } from "../database/DatabaseService";
import { WebService } from "../http/WebService";
import { TeleboardError } from "../common/Exceptions";
import { readFileJson } from "../common/Files";
import { Config } from "./Config";
import path from "path";
import fs from "fs";
import { InitOptions } from "./Options";

// The data directory is resolved relative to the build
// directory in which production files are outputted.
const DATA_DIR_RELATIVE_TO_BUILD = "../../../data";

/**
 * The main entry point for Teleboard, in charge of
 * maintaining all server side relations as well as
 * serving client resources.
 */
export class TeleboardServer {

	// Services
	public readonly web: WebService;
	public readonly database: DatabaseService;

	public readonly options: InitOptions;
	public readonly config: Config;
	public readonly isDebug: boolean;

	public logger!: Logger;

	private installing: boolean;
	private dataDir: string;

	/**
	 * Initialize teleboard server resources without
	 * launching any services.
	 */
	public constructor(options: InitOptions) {
		this.dataDir = path.join(__dirname, DATA_DIR_RELATIVE_TO_BUILD);
		this.options = options;

		// TODO Move to independant and re-useable config loader
		// Load in the config file
		const conFile = this.getDataFile("config.json");

		if (fs.existsSync(conFile)) {
			this.config = readFileJson(conFile);
			this.installing = false;
		} else {
			const defaultConFile = this.getDataFile("config.default.json");

			if (!fs.existsSync(defaultConFile)) {
				throw new TeleboardError(
					"Failed to locate default config file " +
					"(Make sure config.default.json is in the data folder and is readable!)"
				);
			}

			this.config = readFileJson(defaultConFile);
			this.installing = true;
		}

		// Detect debug mode
		this.isDebug = this.config.debug || process.env.NODE_ENV == "development";

		// Setup the global logger
		this.initLogger();

		// Instantiate services
		this.web = new WebService(this);
		this.database = new DatabaseService(this);
	}

	/**
	 * Launch the Teleboard Server
	 *
	 * @package
	 */
	public launch() {
		this.logger.info('Launching teleboard server');
		
		if(this.isDebug) {
			this.logger.info('Initializing in development mode');
		} else {
			this.logger.info('Initializing production services');
		}

		// Start services
		this.web.start();
		this.database.start();
	}

	/**
	 * Terminate the active Teleboard process and shut down
	 * all related services.
	 */
	public terminate() {
		this.logger.info('Terminating teleboard server');

		// Shutdown services
		this.web.stop();
		this.database.stop();
	}

	/**
	 * Instantiate and configure the main Teleboard logger instance
	 */
	public initLogger() {
		this.logger = this.getLogger('Teleboard');
	}

	/**
	 * Returns a new logger instance with the given label
	 * 
	 * @param label Label string
	 * @returns New logger
	 */
	public getLogger(label: string) : Logger {
		const logFile = this.getDataFile(this.config.logFile);

		const logFormatter = format.printf(({timestamp, label, level, message}) => {
			return `${timestamp} [${label}] ${level}: ${message}`;
		});

		return createLogger({
			level: "debug",
			transports: this.options.isInCLI ? [

				new transports.Console({
					silent: true
				})

			] : [

				// Log every message to the logfile
				new transports.File({
					filename: logFile,
					format: format.combine(
						format.timestamp({format: 'HH:mm:ss'}),
						format.label({label}),
						logFormatter
					)
				}),

				// Log every message colorized to console
				new transports.Console({
					format: format.combine(
						format.timestamp({format: 'HH:mm:ss'}),
						format.label({label}),
						format.colorize(),
						logFormatter
					)
				})
			]
		});
	}

	/**
	 * Resolve a file inside the data directory
	 * 
	 * @param file The file
	 * @returns Absolute path
	 */
	public getDataFile(file: string) : string {
		return path.normalize(path.join(this.dataDir, file));
	}

	/**
	 * Returns whether the Teleboard panel is currently
	 * in installation mode
	 */
	get isInstalling() : boolean {
		return this.isInstalling;
	}
}
