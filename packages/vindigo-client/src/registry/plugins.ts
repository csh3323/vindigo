import Oruga from '@oruga-ui/oruga';
import Router from 'vue-router';
import Store from 'vuex';
import Trend from 'vuetrend';
import VWave from 'v-wave';
import Vue from 'vue';
import VueEllipseProgress from 'vue-ellipse-progress';

/**
 * Define all Vue plugins
 */
export function registerPlugins() {
	Vue.use(VueEllipseProgress, 'spinner');
	Vue.use(Oruga);
	Vue.use(Router);
	Vue.use(Store);
	Vue.use(VWave);
	Vue.use(Trend);
}