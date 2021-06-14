import HomePage from '../views/home/HomePage.vue';
import KanbanPage from '../views/project/kanban/KanbanOverview.vue';
import ProjectHome from '../views/project/ProjectHome.vue';
import ProjectPage from '../views/project/ProjectPage.vue';
import TasksPage from '../views/project/tasks/TasksOverview.vue';
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
				component: ProjectHome,
				meta: {
					name: 'VIEW_HOME',
					icon: 'mdi-home',
					order: 0
				}
			},
			{
				path: 'tasks',
				name: 'Tasks View',
				component: TasksPage,
				meta: {
					name: 'VIEW_TASKS',
					icon: 'mdi-format-list-bulleted-square',
					order: 1
				}
			},
			{
				path: 'kanban',
				name: 'Kanban View',
				component: KanbanPage,
				meta: {
					name: 'VIEW_KANBAN',
					icon: 'mdi-view-column',
					order: 2
				}
			},
			{
				path: 'calendar',
				name: 'Calendar View',
				component: undefined,
				meta: {
					name: 'VIEW_CALENDAR',
					icon: 'mdi-calendar-blank',
					order: 3
				}
			},
			{
				path: 'whiteboard',
				name: 'Whiteboard View',
				component: undefined,
				meta: {
					name: 'VIEW_WHITEBOARD',
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