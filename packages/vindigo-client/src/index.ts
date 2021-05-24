import '@oruga-ui/oruga/dist/oruga.css';

import App from './view/App.vue';
import Oruga from '@oruga-ui/oruga';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Router from 'vue-router';
import Store from 'vuex';
import Vue from 'vue';
import dayjs from 'dayjs';
import VueRouter from 'vue-router';

// Configure packages
dayjs.locale('nl-nl');
dayjs.extend(RelativeTime);

// Configure routes
const routes = [
	{ path: '/', component: () => import('./view/Home.vue') },
	{ path: '/list', component: null },
	{ path: '/edit', component: null },
	{ path: '/restore', component: null },
	{ path: '/organization', component: null }
];

const router = new VueRouter({
	routes: routes,
	mode: 'history'
});

//Vue.use(Oruga);
Vue.use(Router);
Vue.use(Store);

// Instantiate the application
const vue = new Vue({
	el: '#app',
	router,
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