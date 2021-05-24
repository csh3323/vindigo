import '@oruga-ui/oruga/dist/oruga.css';

import App from './view/App.vue';
import { ExtensionService } from "./extensions";
import Oruga from '@oruga-ui/oruga';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Router from 'vue-router';
import { RoutingService } from "./routing";
import Store from 'vuex';
import { StoreService } from "./store";
import Vue from 'vue';
import dayjs from 'dayjs';

// Define the services
const routing = new RoutingService();
const store = new StoreService();
const extensions = new ExtensionService();

export {
	routing,
	store,
	extensions
};

// Configure packages
dayjs.locale('nl-nl');
dayjs.extend(RelativeTime);

Vue.use(Oruga);
Vue.use(Router);
Vue.use(Store);

// Instantiate the application
const vue = new Vue({
	el: '#app',
	render: (m) => {
		return m(App);
	}
});

// Store a global reference
Object.defineProperty(window, 'Vindigo', {
	writable: false,
	value: {
		vue
	}
});

export { vue };