"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function readFileText(path) {
    return fs_1.default.readFileSync(path, 'utf8');
}
exports.readFileText = readFileText;
function readFileJson(path) {
    return JSON.parse(readFileText(path));
}
exports.readFileJson = readFileJson;
