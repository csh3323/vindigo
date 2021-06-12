import '@oruga-ui/oruga/dist/oruga.css';
import './style/global.css';

import App from './components/App.vue';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { RoutingService } from "./routing";
import { StoreService } from "./store";
import Vue from 'vue';
import dayjs from 'dayjs';
import { registerComponents } from './registry/components';
import { registerPlugins } from './registry/plugins';
import { registerRoutes } from './registry/routes';
import { registerState } from './registry/state';

// Configure packages
dayjs.locale('nl-nl');
dayjs.extend(RelativeTime);

// Define the services
const routing = new RoutingService();
const store = new StoreService();

export {
	routing,
	store
};

// Register all core registries with
// their initial data and state
registerComponents();
registerPlugins();
registerRoutes();
registerState();

// TODO Load extensions

// Instantiate the application
const vue = new Vue({
	el: '#app',
	router: routing.complete(),
	store: store.complete(),
	render: (m) => {
		return m(App);
	}
});

// Store a global reference
Object.defineProperty(window, 'vindigo', {
	writable: false,
	value: {
		routing,
		store
	}
});

export { vue };