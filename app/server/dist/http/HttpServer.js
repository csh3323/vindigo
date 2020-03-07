"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class HttpServer {
    constructor(app) {
        this.app = app;
        this.http = express_1.default();
        // Listen to all incoming GET requests
        this.http.get('*', (req, res) => {
        });
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=HttpServer.js.map