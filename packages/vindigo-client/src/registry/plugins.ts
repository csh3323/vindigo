import Oruga from '@oruga-ui/oruga';
import Router from 'vue-router';
import Store from 'vuex';
import VWave from 'v-wave';
import Vue from 'vue';

/**
 * Define all Vue plugins
 */
export function registerPlugins() {
	Vue.use(Oruga);
	Vue.use(Router);
	Vue.use(Store);
	Vue.use(VWave);
}