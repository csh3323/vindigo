import 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css';
import 'wave-ui/dist/wave-ui.css';
import './style/global.vue';
import './style/wave.vue';

import { APIService } from './api';
import App from './views/App.vue';
import { I18nService } from './i18n';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { RoutingService } from "./routing";
import { StoreService } from "./store";
import Vue from 'vue';
import WaveUI from 'wave-ui';
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

// Load wave ui
// TODO sync colors with Tailwind
// See: https://tailwindcss.com/docs/configuration#referencing-in-java-script
const waveui = new WaveUI({
	disableColorShades: true,
	colors: {
		primary: '#3B42B2'
	}
});

// Instantiate the application
const vue = new Vue({
	el: '#app',
	router: routing.complete(),
	store: store.complete(),
	i18n: i18n.complete(),
	waveui: waveui,
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