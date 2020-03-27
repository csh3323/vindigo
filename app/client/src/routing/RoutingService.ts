import VueRouter, { RouterOptions, RouteConfig } from 'vue-router';
import { IPage } from './IPage';
import _ from 'lodash';

/**
 * The class used to define application routes
 * before they are passed to the Vue router.
 * 
 * Once the router is built, all modifications
 * to the page structure are blocked.
 */
export class RoutingService {

	/** Application routes */
	private readonly config: RouterOptions;

	/** List of all pages */
	private readonly pages: IPage[];

	/** Editing lock */
	private initialized: boolean;

	public constructor() {
		this.initialized = false;
		this.config = {
			mode: 'history',
			routes: []
		}
	}

	/**
	 * Register a new routing endpoint on this router. Each
	 * registered page must have a unique id field.
	 * 
	 * @param route Route config
	 */
	public registerRoute(route: IPage) {
		if(this.initialized) {
			throw new Error('Router already configured');
		}

		this.pages.push(route);
	}

	/**
	 * Unregister and remove the routing endpoint with the
	 * specified id.
	 * 
	 * @param id The page identifier
	 * @returns true when a page was removed 
	 */
	public removeRoute(id: string) : boolean {
		if(this.initialized) {
			throw new Error('Router already configured');
		}

		return _.remove(this.pages, (page) => page.id == id).length > 0;
	}

	/**
	 * Returns successfully when a page with the given id
	 * exists on this router.
	 * 
	 * @param id The page identifier
	 * @returns True when the page exists, false otherwise
	 */
	public hasPage(id: string) : boolean {
		return !!_.find(this.pages, (page) => page.id == id);
	}

	/**
	 * Returns an array holding all currently registered routes
	 * 
	 * @returns Read-only copy of the routes
	 */
	public getRoutes() : IPage[] {
		return [...this.pages];
	}

	/**
	 * Build a new router instance for use on the
	 * root vue instance
	 * 
	 * @returns VueRouter instance
	 */
	public buildRouter() : VueRouter {
		if(this.initialized) {
			throw new Error('Router already configured');
		}

		this.initialized = true;
		this.config.routes = this.pages.map(page => ({
			...page,
			meta: {
				id: page.id
			}
		}));

		return new VueRouter(this.config);
	}

	/**
	 * Returns true when the instance has been fully
	 * initialized and further modifications are no
	 * longer permitted.
	 */
	public get isInitialized() {
		return this.initialized;
	}

}