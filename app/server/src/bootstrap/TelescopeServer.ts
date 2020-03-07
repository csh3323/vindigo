import { Logger, createLogger, format, transports } from "winston";
import { TelescopeWebServer } from "../http/WebServer";
import { TelescopeError } from "../common/Exceptions";
import { readFileJson } from "../common/Files";
import { Config } from "./Config";
import moment from "moment";
import path from "path";
import fs from "fs";

/**
 * The main entry point for Telescope, in charge of
 * maintaining all server side relations as well as
 * serving client resources.
 */
export class TelescopeServer {
	private dataDir: string;

	public readonly isDebug: boolean;

	public webServer: TelescopeWebServer;
	public config: Config;
	public logger: Logger;
	public installing: boolean;

	/**
	 * Initialize telescope server resources without
	 * launching any services.
	 */
	public constructor() {
		this.dataDir = path.join(__dirname, "../../../../data");

		// Load in the config file
		const conFile = path.join(this.dataDir, "config.json");

		if (fs.existsSync(conFile)) {
			this.config = readFileJson(conFile);
			this.installing = false;
		} else {
			const defaultConFile = path.join(this.dataDir, "config.default.json");

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
		this.webServer = new TelescopeWebServer(this);
	}

	/**
	 * Launch the Telescope Server
	 *
	 * @package
	 */
	public launch() {
		this.logger.info('Launching telescope server');

		this.webServer.start();
	}

	/**
	 * Terminate the active Telescope process and shut down
	 * all related services.
	 */
	public terminate() {
		this.logger.info('Terminating telescope server');

		this.webServer.stop();
	}

	/**
	 * Returns a new logger instance with the given label
	 * 
	 * @param label Label string
	 * @returns New logger
	 */
	public getLogger(label: string) : Logger {
		const logFile = path.join(this.dataDir, this.config.logFile);

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
}