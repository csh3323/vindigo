"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Root class for all errors thrown by Telescope
 */
class TelescopeError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.TelescopeError = TelescopeError;
/**
 * An error thrown when an error is caught during
 * the handling of an incoming HTTP request.
 */
class TelescopeHttpError extends Error {
    constructor(message, req) {
        super(message);
        this.request = req;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.TelescopeHttpError = TelescopeHttpError;
