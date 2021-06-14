import { isString } from "lodash";
import VueRouter, { RouteConfig, RouterOptions } from "vue-router";

import { getRouteMeta, logger, updateTitle } from "./util";

/**
 * The service in charge of managing routing 
 */
export class RoutingService {

	public instance!: VueRouter;
	
	private logger = logger('Router');
	private index: {[key: string]: RouteConfig} = {};
	private options: RouterOptions;
	private initialized = false;

	public constructor() {
		this.options = {
			mode: 'history',
			routes: [],
		};
	}

	/**
	 * Returns a list of all defined routes
	 */
	public get routes(): RouteConfig[] {
		return this.options.routes!;
	}

	/**
	 * Define a new route in the application.
	 * 
	 * @param config The config
	 */
	public defineRoute(config: RouteConfig & RequiredName) {
		if(this.initialized) {
			throw new Error('Router already configured');
		}

		const name = config.name;
		
		if(this.index[name]) {
			throw new Error(`Route with name ${name} already registered`);
		}

		this.index[name] = config;
		this.options.routes!.push(config);
		this.logger('Defined route ' + config.path);
	}

	/**
	 * Returns the route with the given name
	 * 
	 * @param name The route
	 * @returns The route config if it is defined
	 */
	public getRoute(name: string): RouteConfig|undefined {
		return this.index[name];
	}

	/**
	 * Lock the current routing service from modifications and
	 * return the final VueRouter instance.
	 * 
	 * @returns The vue router
	 */
	public complete(): VueRouter {
		if(this.initialized) {
			throw new Error('Router already configured');
		}
		
		const router = new VueRouter(this.options);
		
		router.beforeEach((to, _from, next) => {
			const title = getRouteMeta(to, 'title');

			if(isString(title)) {
				updateTitle(title);
			} else if(title !== false && to.name) {
				updateTitle(to.name);
			}
			
			next();
		});

		this.initialized = true;
		this.instance = router;

		return router;
	}

}

export interface RequiredName {
	name: string;
}