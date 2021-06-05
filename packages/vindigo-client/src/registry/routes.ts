import HomePage from '../pages/home/HomePage.vue';
import { routing } from "..";

/**
 * Register all routing endpoints
 */
export function registerRoutes() {

	routing.defineRoute({
		path: '/',
		name: 'Homepage',
		component: HomePage
	});

	routing.defineRoute({
		path: '/profile/:user',
		name: 'Profile',
		component: undefined
	});

	routing.defineRoute({
		path: '/profile/:user',
		name: 'Profile',
		component: undefined
	});

	routing.defineRoute({
		path: '/team/:team',
		name: 'Team Overview',
		component: undefined
	});

	routing.defineRoute({
		path: '/project/:project',
		name: 'Project Container',
		component: undefined,
		children: [
			{
				path: '/tasks',
				name: 'Tasks View',
				component: undefined
			},
			{
				path: '/kanban',
				name: 'Kanban View',
				component: undefined
			},
			{
				path: '/calendar',
				name: 'Calendar View',
				component: undefined
			},
			{
				path: '/whiteboard',
				name: 'Whiteboard View',
				component: undefined
			},
			{
				path: '',
				name: 'Project Overview',
				component: undefined
			}
		]
	});

	// NOTE 404 error fallback page - Always keep as final route!
	routing.defineRoute({
		name: 'Not Found',
		path: '*',
		component: undefined
	});
	
}