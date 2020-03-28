import { RoutingService } from './RoutingService';
import HomePage from '../components/home/Home.vue';
import BoardPage from '../components/board/Board.vue';
import BoardLists from '../components/board/Lists.vue';

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
				path: 'settings',
				id: 'board-settings',
				name: 'Board Settings',
				view: BoardLists
			}
		]
	});


}