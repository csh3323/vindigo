import { RoutingService } from './RoutingService';
import HomePage from '../views/home/Home.vue';
import BoardPage from '../views/board/Board.vue';
import BoardLists from '../views/board/Lists.vue';

export function registerDefaults(router: RoutingService) {
	
	router.registerRoute('/', {
		id: 'homepage',
		name: 'Homepage',
		view: HomePage
	});
	
	router.registerRoute('/board/:id', {
		id: 'board',
		name: 'Board Overview',
		view: BoardPage,
		redirect: '/board/:id/tasks',
		children: [
			{
				path: 'tasks',
				id: 'board-lists',
				name: 'Board Lists',
				view: BoardLists
			},
			{
				path: 'calendar',
				id: 'board-calendar',
				name: 'Board Calendar',
				view: BoardLists
			},
			{
				path: 'members',
				id: 'board-members',
				name: 'Board Members',
				view: BoardLists
			},
			{
				path: 'settings',
				id: 'board-settings',
				name: 'Board Settings',
				view: BoardLists
			}
		]
	});


}