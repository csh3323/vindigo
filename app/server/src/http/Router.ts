import { Router } from 'express';
import { createConnector } from './Connector';
import { WebService } from './WebService';
import { BoardCreateController } from './controllers/BoardCreateController';
import { BoardListController } from './controllers/BoardListController';

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
	router.get('/board', connect(new BoardListController()));
	router.post('/board', connect(new BoardCreateController()));

	// Administrative

}