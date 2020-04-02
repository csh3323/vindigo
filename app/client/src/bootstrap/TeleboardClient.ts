import 'vuetify/dist/vuetify.min.css';
import '../../assets/style/common.scss';
import '../../assets/style/default.scss';

import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n'; 
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import AppComponent from '../components/App.vue';
import Colors from "vuetify/es5/util/colors";
import { RoutingService } from '~/routing/RoutingService';
import { StoreService } from '~/store/StoreService';
import { registerDefaults as registerRoutes } from '~/routing/RoutingDefaults';
import { registerDefaults as registerStore } from '~/store/StoreDefaults';

/**
 * The main Teleboard client management class, in charge of
 * handling all client side aspects of Teleboard.
 */
export class TeleboardClient {

	/** The root vue instance */
	public instance!: Vue;

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
	 * Launch the Teleboard Client
	 */
	public launch() {
		const colorTheme = {
			primary: Colors.blueGrey.base,
			secondary: Colors.grey.darken4,
			accent: Colors.lightBlue.base,
			success: Colors.lightGreen.base,
		};

		const vuetify = new Vuetify({
			theme: {
				themes: {
					dark: colorTheme,
					light: colorTheme
				}
			}
		});

		// Register core routing endpoints and store state
		registerRoutes(this.router);
		registerStore(this.store);

		// Instantiate the vue instance
		this.instance = new Vue({
			el: '#app',
            router: this.router.buildRouter(),
            store: this.store.buildStore(),
			vuetify: vuetify,
            render: h => h(AppComponent, {
				props: {
					app: this,
					store: this.store,
					router: this.router
				}
			}),
        });

		// Store a global reference
		Object.defineProperty(window, 'teleboard', {
			value: this,
			writable: false
		});
	}

}