import '@oruga-ui/oruga/dist/oruga.css';

import App from './view/App.vue';
import Oruga from '@oruga-ui/oruga';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Router from 'vue-router';
import { RoutingService } from "./routing";
import Store from 'vuex';
import { StoreService } from "./store";
import Vue from 'vue';
import dayjs from 'dayjs';

// Configure packages
dayjs.locale('nl-nl');
dayjs.extend(RelativeTime);

Vue.use(Oruga);
Vue.use(Router);
Vue.use(Store);

// Define the services
const routing = new RoutingService();
const store = new StoreService();

export {
	routing,
	store
};

// Instantiate the application
const vue = new Vue({
	el: '#app',
	router: routing.complete(),
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