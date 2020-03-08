"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const WebServer_1 = require("../http/WebServer");
const Exceptions_1 = require("../common/Exceptions");
const Files_1 = require("../common/Files");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * The main entry point for Telescope, in charge of
 * maintaining all server side relations as well as
 * serving client resources.
 */
class TelescopeServer {
    /**
     * Initialize telescope server resources without
     * launching any services.
     */
    constructor() {
        this.dataDir = path_1.default.join(__dirname, "../../../../data");
        // Load in the config file
        const conFile = path_1.default.join(this.dataDir, "config.json");
        if (fs_1.default.existsSync(conFile)) {
            this.config = Files_1.readFileJson(conFile);
            this.installing = false;
        }
        else {
            const defaultConFile = path_1.default.join(this.dataDir, "config.default.json");
            if (!fs_1.default.existsSync(defaultConFile)) {
                throw new Exceptions_1.TelescopeError("Failed to locate default config file " +
                    "(Make sure config.default.json is in the data folder and is readable!)");
            }
            this.config = Files_1.readFileJson(defaultConFile);
            this.installing = true;
        }
        // Detect debug mode
        this.isDebug = this.config.debug || process.env.NODE_ENV == "development";
        // Setup the global logger
        this.logger = this.getLogger('Telescope');
        // Instantiate services
        this.webServer = new WebServer_1.TelescopeWebServer(this);
    }
    /**
     * Launch the Telescope Server
     *
     * @package
     */
    launch() {
        this.logger.info('Launching telescope server');
        this.webServer.start();
    }
    /**
     * Terminate the active Telescope process and shut down
     * all related services.
     */
    terminate() {
        this.logger.info('Terminating telescope server');
        this.webServer.stop();
    }
    /**
     * Returns a new logger instance with the given label
     *
     * @param label Label string
     * @returns New logger
     */
    getLogger(label) {
        const logFile = path_1.default.join(this.dataDir, this.config.logFile);
        const logFormatter = winston_1.format.printf(({ timestamp, label, level, message }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        });
        return winston_1.createLogger({
            level: "debug",
            transports: [
                // Log every message to the logfile
                new winston_1.transports.File({
                    filename: logFile,
                    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'HH:mm:ss' }), winston_1.format.label({ label }), logFormatter)
                }),
                // Log every message colorized to console
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'HH:mm:ss' }), winston_1.format.label({ label }), winston_1.format.colorize(), logFormatter)
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
    getDataFile(file) {
        return path_1.default.normalize(path_1.default.join(this.dataDir, file));
    }
}
exports.TelescopeServer = TelescopeServer;
