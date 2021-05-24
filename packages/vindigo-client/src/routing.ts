import VueRouter, { RouteConfig, RouterOptions } from "vue-router";

import { logger } from "./util";
import { merge } from "lodash";

/**
 * The service in charge of managing routing 
 */
export class RoutingService {

	private logger = logger('Router');
	
	private options: RouterOptions;
	private initialized = false;

	public constructor() {
		this.initialized = false;
		this.options = {
			mode: 'history',
			routes: []
		};
	}

	/**
	 * Define a new route in the application.
	 * 
	 * @param config The config
	 */
	public defineRoute(config: RouteConfig) {
		if(this.initialized) {
			throw new Error('Router already configured');
		}

		this.logger('Defined ', config.path);
		this.options.routes = merge(this.options.routes!, [config]);
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
		
		this.initialized = true;
		return new VueRouter(this.options);
	}

}