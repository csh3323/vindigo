import '@oruga-ui/oruga/dist/oruga.css';
import './style/main.css';

import App from './view/App.vue';
import Oruga from '@oruga-ui/oruga';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Router from 'vue-router';
import Store from 'vuex';
import Vue from 'vue';
import dayjs from 'dayjs';

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