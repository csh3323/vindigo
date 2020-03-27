import VueRouter, { RouterOptions, RouteConfig } from 'vue-router';
import { IPage, IRoutablePage } from './IPage';
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
	private readonly pages: IRoutablePage[];

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
		this.config.routes = this.pages.map(page => ({
			component: page.view,
			path: page.path,
			name: page.name,
			meta: {
				id: page.id
			},
			beforeEnter: (to, _from, next) => {
				document.title = 'Telescope — ' + to.name;
				this.currentPage = page;
				
				next();
			}
		}));

		return new VueRouter(this.config);
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

}