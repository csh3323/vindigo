import { RoutingService } from './RoutingService';
import BoardPage from '../components/board/Board.vue';

export function registerDefaults(router: RoutingService) {
	
	router.registerRoute('/', {
		id: 'dev-page',
		name: 'Board',
		view: BoardPage
	});


}