import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n'; 
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import AppComponent from '~/components/BoardPage.vue';

import 'vuetify/dist/vuetify.min.css';
import '../../assets/style/common.scss';
import { RoutingService } from '~/routing/RoutingService';
import { StoreService } from '~/store/StoreService';
import { registerDefaults as registerRoutes } from '~/routing/RoutingDefaults';
import { registerDefaults as registerStore } from '~/store/StoreDefaults';

/**
 * The main Telescope client management class, in charge of
 * handling all client side aspects of Telescope.
 */
export class TelescopeClient {

	/** The root vue instance */
	public rootVue: Vue;

	/** The router configuration */
	public readonly router: RoutingService;

	/** The store configuration */
	public readonly store: StoreService;

	public constructor() {
		Vue.config.productionTip = false;

		Vue.use(Vuex);
		Vue.use(VueI18n);
		Vue.use(Vuetify);
		Vue.use(VueRouter);
		Vue.use(VueCompositionApi);

		this.router = new RoutingService();
		this.store = new StoreService();
	}

	/**
	 * Launch the Telescope Client
	 */
	public launch() {
		const vuetify = new Vuetify({
			theme: {
				dark: true
			}
		});

		// Register core routing endpoints and store state
		registerRoutes(this.router);
		registerStore(this.store);

		// Instantiate the vue instance
		this.rootVue = new Vue({
			el: '#app',
            router: this.router.buildRouter(),
            store: this.store.buildStore(),
			vuetify: vuetify,
            render: h => h(AppComponent, {
				props: {
					app: this
				}
			}),
        });

		// Store a global reference
		window['telescope'] = this;
	}

}