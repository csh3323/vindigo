import { Router } from 'express';
import { connect } from 'http/Connector';
import { TestController } from './controllers/TestController';

/**
 * Configure the core backend API endpoints.
 * 
 * Extensions will be able to hook in additional API endpoints
 * after the core routes have been registered.
 * 
 * @param router The router 
 */
export function setupCoreRoutes(router: Router) {

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