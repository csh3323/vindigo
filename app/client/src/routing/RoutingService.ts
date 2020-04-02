import VueRouter, { RouterOptions, RouteConfig, RawLocation, Route } from 'vue-router';
import { IPage, IRoutablePage } from './IPage';
import _ from 'lodash';
import { Router } from 'express';

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
	private readonly pages: IRoutablePage[];

	/** The vue router instance */
	private vueRouter?: VueRouter;

	/** The currently active page */
	private currentPage?: IRoutablePage;

	/** Editing lock */
	private initialized: boolean;

	public constructor() {
		this.initialized = false;
		this.pages = [];
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
	public registerRoute(path: string, route: IPage) {
		if(this.initialized) {
			throw new Error('Router already configured');
		} else if(this.hasPage(route.id)) {
			throw new Error('Page with id "' + route.id + '" already registed');
		}

		// Append a page instance
		this.pages.push({
			...route,
			path: path
		});
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
		this.config.routes = this.pages.map(this.composeRoute.bind(this));

		const router = new VueRouter(this.config);
		this.vueRouter = router;
		return router;
	}

	/**
	 * Recursively compose a RouteConfig tree for the
	 * given page and all its child pages.
	 * 
	 * @param page The page
	 * @returns RouteConfig
	 */
	private composeRoute(page: IRoutablePage) : RouteConfig {
		const route: RouteConfig = {
			component: page.view,
			path: page.path,
			name: page.name,
			meta: { id: page.id },
			children: (page.children || []).map(page => this.composeRoute(page)),
			beforeEnter: (to, _from, next) => {
				document.title = 'Teleboard — ' + to.name;
				this.currentPage = page;
				
				next();
			}
		}

		if(page.redirect) {
			route.redirect = page.redirect;
		}

		return route;
	}

	/**
	 * Navigate to the specified location
	 * 
	 * @param location The location, or undefined if no navigation was peformed
	 */
	public async goto(location: RawLocation) : Promise<Route|undefined> {
		try {
			const route = await this.router.push(location);
			console.debug('Navigated to route ' + route.name);
			return route;
		} catch (err) {
			if(err.name == 'NavigationDuplicated') return;
			console.error('Error caught during page navigation');
			throw err;
		}
	}

	/**
	 * Returns true when the instance has been fully
	 * initialized and further modifications are no
	 * longer permitted.
	 */
	public get isInitialized() : Boolean {
		return this.initialized;
	}

	/**
	 * Returns the currently active page
	 * 
	 * @throws when the user has to entered a page yet
	 */
	public get current() : IPage {
		if(!this.currentPage) {
			throw new Error('The user has not entered a page yet');
		}

		return this.currentPage;
	}

	/**
	 * Returns the internal vue router instance
	 * 
	 * @throws when the router has not been built yet
	 */
	public get router() : VueRouter {
		if(this.vueRouter === undefined) {
			throw new Error('The router has not been built yet');
		}

		return this.vueRouter;
	}

}