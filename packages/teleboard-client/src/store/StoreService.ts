import { Store, Module, ModuleTree } from 'vuex';

/**
 * The class used to define application wide
 * state separated into modules.
 */
export class StoreService {

	/** Store modules */
	private readonly modules: ModuleTree<any>;

	/** Editing lock */
	private initialized: boolean;

	public constructor() {
		this.initialized = false;
		this.modules = {};
	}

	/**
	 * Register a new store module onto this Store Service
	 * 
	 * @param id The store id
	 * @param store The store module
	 */
	public registerStore(id: string, store: Module<any, any>) {
		if(this.initialized) {
			throw new Error('Store already initialized');
		} else if(this.modules[id]) {
			throw new Error('Store already registered');
		}

		this.modules[id] = {
			namespaced: true,
			...store
		};
	}

	/**
	 * Build a new store instance for use on the
	 * root vue instance
	 * 
	 * @returns Vuex instance
	 */
	public buildStore() : Store<any> {
		return new Store({
			modules: this.modules
		});
	}

}