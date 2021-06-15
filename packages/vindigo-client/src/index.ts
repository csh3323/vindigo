import './style/global.css';

import { APIService } from './api';
import App from './components/App.vue';
import { I18nService } from './i18n';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { RoutingService } from "./routing";
import { StoreService } from "./store";
import Vue from 'vue';
import dayjs from 'dayjs';
import { registerComponents } from './registry/components';
import { registerPlugins } from './registry/plugins';
import { registerRoutes } from './registry/routes';
import { registerState } from './registry/store/state';


dayjs.extend(RelativeTime);

// Define the services
const routing = new RoutingService();
const store = new StoreService();
const i18n = new I18nService();
const api = new APIService();

export {
	routing,
	store,
	i18n,
	api
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
	i18n: i18n.complete(),
	render: (m) => {
		return m(App);
	}
});

// Store a global reference
Object.defineProperty(window, 'vindigo', {
	writable: false,
	value: {
		routing,
		store,
		i18n,
		api,
		vue
	}
});

// Request the latest client config
store.instance.dispatch('fetchConfig');

// Sign in with the existing token
store.instance.dispatch('authenticate');

export { vue };