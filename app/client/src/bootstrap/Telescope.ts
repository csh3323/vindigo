import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n'; 
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

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
	}

	/**
	 * Launch the Telescope Client
	 */
	public launch() {
		this.rootVue = new Vue({
			el: '#app',
            router: null,
            store: null,
            render: h => {
				return null;
			}
        });

		// Store a global reference
		window['telescope'] = this;
	}

}