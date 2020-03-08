"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TelescopeServer_1 = require("./bootstrap/TelescopeServer");
const death_1 = __importDefault(require("death"));
(function () {
    const telescope = new TelescopeServer_1.TelescopeServer();
    // Launch all related telescope services and start
    // processing the main telescope event loop.
    telescope.launch();
    death_1.default(() => {
        telescope.terminate();
    });
})();
