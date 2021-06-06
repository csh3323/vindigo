import Icon from '../components/Icon.vue';
import IconButton from '../components/button/IconButton.vue';
import Oruga from '@oruga-ui/oruga';
import Router from 'vue-router';
import Store from 'vuex';
import Toolbar from '../components/layout/Toolbar.vue';
import VWave from 'v-wave';
import Vue from 'vue';

/**
 * Define all Vue components, directives, and plugins
 */
export function registerVue() {
	Vue.use(Oruga);
	Vue.use(Router);
	Vue.use(Store);
	Vue.use(VWave);

	Vue.component('icon-btn', IconButton);
	Vue.component('icon', Icon);
	Vue.component('toolbar', Toolbar);
}