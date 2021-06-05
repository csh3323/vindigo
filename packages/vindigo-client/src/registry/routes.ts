import HomePage from '../pages/home/HomePage.vue';
import { routing } from "..";

/**
 * Register all routing endpoints
 */
export function registerRoutes() {

	routing.defineRoute({
		path: '/',
		component: HomePage
	});
	
	
}