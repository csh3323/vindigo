import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n'; 
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import TelescopeApp from '~/components/TelescopeApp.vue';

import '../../assets/style/common.scss';

/**
 * The main Telescope client management class, in charge of
 * handling all client side aspects of Telescope.
 */
export class TelescopeClient {

	/** The root vue instance */
	public rootVue: Vue;

	public constructor() {
		Vue.config.productionTip = false;

		Vue.use(Vuex);
		Vue.use(VueI18n);
		Vue.use(Vuetify);
		Vue.use(VueRouter);
		Vue.use(VueCompositionApi);
	}

	/**
	 * Launch the Telescope Client
	 */
	public launch() {
		this.rootVue = new Vue({
			el: '#app',
            router: null,
            store: null,
            render: h => h(TelescopeApp, {
				props: {
					app: this
				}
			}),
        });

		// Store a global reference
		window['telescope'] = this;
		
	}

}