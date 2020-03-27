import { RoutingService } from './RoutingService';
import BoardPage from '../components/page/BoardPage.vue';

export function registerDefaults(router: RoutingService) {
	
	router.registerRoute('/', {
		id: 'page-not-found',
		name: 'Page Not Found',
		view: BoardPage
	});


}