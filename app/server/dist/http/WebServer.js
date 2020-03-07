"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class TelescopeWebServer {
    constructor(app) {
        this.app = app;
        this.http = express_1.default();
        this.logger = app.getLogger('Http');
    }
    /**
     * Start the web server and bind to the port defined
     * in the Telescope config
     */
    start() {
        const port = this.app.config.web.port;
        // Register all routes
        this.http.get('/', (req, res) => {
            res.send('Hello Worlderietus');
        });
        // Listen to all incoming GET requests
        this.internal = this.http.listen(port, (err) => {
            if (err) {
                this.logger.error('Failed to bind: ' + err);
                this.app.terminate();
                return;
            }
            this.logger.info('Successfully listening on port ' + port);
        });
    }
    /**
     * Stop the active
     */
    stop() {
        if (this.internal)
            this.internal.close();
    }
}
exports.TelescopeWebServer = TelescopeWebServer;
//# sourceMappingURL=WebServer.js.map