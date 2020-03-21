import { Logger, createLogger, format, transports } from "winston";
import { DatabaseService } from "../database/DatabaseService";
import { WebService } from "../http/WebService";
import { TelescopeError } from "../common/Exceptions";
import { readFileJson } from "../common/Files";
import { Config } from "./Config";
import path from "path";
import fs from "fs";

// The data directory is resolved relative to the build
// directory in which production files are outputted.
const DATA_DIR_RELATIVE_TO_BUILD = "../../../data";

/**
 * The main entry point for Telescope, in charge of
 * maintaining all server side relations as well as
 * serving client resources.
 */
export class TelescopeServer {

	// Services
	public readonly web: WebService;
	public readonly database: DatabaseService;

	public readonly config: Config;
	public readonly logger: Logger;
	public readonly isDebug: boolean;

	private installing: boolean;
	private dataDir: string;

	/**
	 * Initialize telescope server resources without
	 * launching any services.
	 */
	public constructor() {
		this.dataDir = path.join(__dirname, DATA_DIR_RELATIVE_TO_BUILD);

		// Load in the config file
		const conFile = this.getDataFile("config.json");

		if (fs.existsSync(conFile)) {
			this.config = readFileJson(conFile);
			this.installing = false;
		} else {
			const defaultConFile = this.getDataFile("config.default.json");

			if (!fs.existsSync(defaultConFile)) {
				throw new TelescopeError(
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
		this.logger = this.getLogger('Telescope');

		// Instantiate services
		this.web = new WebService(this);
		this.database = new DatabaseService(this);
	}

	/**
	 * Launch the Telescope Server
	 *
	 * @package
	 */
	public launch() {
		this.logger.info('Launching telescope server');

		// Start services
		this.web.start();
		this.database.start();
	}

	/**
	 * Terminate the active Telescope process and shut down
	 * all related services.
	 */
	public terminate() {
		this.logger.info('Terminating telescope server');

		// Shutdown services
		this.web.stop();
		this.database.stop();
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
			transports: [
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
	 * Returns whether the Telescope panel is currently
	 * in installation mode
	 */
	get isInstalling() : boolean {
		return this.isInstalling;
	}
}
