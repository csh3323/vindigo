import 'vuetify/dist/vuetify.min.css';
import '../../assets/style/common.scss';
import '../../assets/style/default.scss';

import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n'; 
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import AppView from '~/views/App.vue';
import DragfieldComponent from '~/components/Dragfield.vue';
import { RoutingService } from '~/routing/RoutingService';
import { StoreService } from '~/store/StoreService';
import { registerDefaults as registerRoutes } from '~/routing/RoutingDefaults';
import { registerDefaults as registerStore } from '~/store/StoreDefaults';
import { ClientRegistry } from './ClientRegistry';

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

	/** The teleboard client registry */
	public readonly registry: ClientRegistry;

	public constructor() {
		Vue.config.productionTip = false;

		this.router = new RoutingService();
		this.store = new StoreService();
		this.registry = new ClientRegistry();
		this.configure();
	}

	/**
	 * Configure client essentials
	 */
	private configure() {
		const registry = this.registry;

		Vue.use(Vuex);
		Vue.use(VueI18n);
		Vue.use(Vuetify);
		Vue.use(VueRouter);
		Vue.use(VueCompositionApi);

		registry.registerComponent('dragfield', DragfieldComponent);
	}

	/**
	 * Launch the Teleboard Client
	 */
	public launch() {

		// TODO Allow for overriding and possibly presets to choose from
		const colorTheme = {
			'primary': '#607D8B',
			'secondary': '#212121',
			'accent': '#03A9F4',
			'success': '#8BC34A',
			'sidebar': '#282828',
			'sidebar-icon': '#8e8e8e'
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

		// Instantiate the vue instance and pass in core props.
		// The AppView will take care of wrapping these props
		// into injectable keys anywhere in the component structure.
		this.instance = new Vue({
			el: '#app',
            router: this.router.buildRouter(),
            store: this.store.buildStore(),
			vuetify: vuetify,
            render: h => h(AppView, {
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

		// throw new Error("Oh nee");
	}

}