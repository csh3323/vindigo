import { Router } from 'express';
import { TestController } from './controllers/TestController';
import { TelescopeServer } from '../bootstrap/TelescopeServer';
import { createConnector } from './Connector';
import { WebService } from './WebService';

/**
 * Configure the core backend API endpoints.
 * 
 * Extensions will be able to hook in additional API endpoints
 * after the core routes have been registered.
 * 
 * @param web The WebService
 * @param router The router 
 */
export function setupCoreRoutes(web: WebService, router: Router) {
	const connect = createConnector(web);

	router.get('/testing', connect(new TestController()));

	// Authentication

	// - POST /auth/register - Register a new account
	// - POST /auth/login - Signin with a new account
	// - GET /auth/token - Obtain a new access token

	// User management

	// - GET /users/$uid - Obtain user profile
	// - DELETE /users/$uid - Remove a user account
	// - PATCH /users/$uid - Update a user profile

	// Homepage

	// Profile

	// Boards

	// Administrative

}