import HomePage from '../pages/home/HomePage.vue';
import ProjectPage from '../pages/project/ProjectPage.vue';
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
		path: '/team/:team',
		name: 'Team Overview',
		component: undefined
	});

	routing.defineRoute({
		path: '/project/:project/',
		name: 'Project Container',
		component: ProjectPage,
		redirect: '/project/:project/overview',
		children: [
			{
				path: 'overview',
				name: 'Project Overview',
				component: undefined,
				meta: {
					icon: 'mdi-home',
					order: 0
				}
			},
			{
				path: 'tasks',
				name: 'Tasks View',
				component: undefined,
				meta: {
					icon: 'mdi-format-list-bulleted-square',
					order: 1
				}
			},
			{
				path: 'kanban',
				name: 'Kanban View',
				component: undefined,
				meta: {
					icon: 'mdi-view-column',
					order: 2
				}
			},
			{
				path: 'calendar',
				name: 'Calendar View',
				component: undefined,
				meta: {
					icon: 'mdi-calendar-blank',
					order: 3
				}
			},
			{
				path: 'whiteboard',
				name: 'Whiteboard View',
				component: undefined,
				meta: {
					icon: 'mdi-brush',
					order: 4
				}
			}
		]
	});

	// NOTE 404 error fallback page - Always keep as final route!
	routing.defineRoute({
		name: 'Not Found',
		path: '*',
		redirect: '/'
	});
	
}