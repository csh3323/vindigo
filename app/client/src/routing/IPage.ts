import { VueConstructor } from 'vue';

/**
 * Represents a single page accessible in the Telescope
 * client application. Each page is uniquely identified
 * by its id field, allowing routes to be referenced and
 * removed during configuration.
 */
export interface IPage {

	/**
	 * A unique identifier to represent this page
	 */
	id: string;

	/**
	 * The display title of this page, used as page title.
	 */
	name: string;

	/**
	 * The root component to render on this page
	 */
	view: any;

	/**
	 * List of child pages, used for hierarchical rendering
	 */
	children?: IRoutablePage[];
}

/**
 * Represents a resource that can be identified by
 * a dynamic path.
 */
export interface IRoutable {

	/**
	 * The public URL to this page in the format '/path/to/resource'.
	 * Path segments may contain dynamic parameters in order to pass
	 * dynamic content into pages.
	 * 
	 * Example: '/board/:id'
	 */
	path: string;

}

/**
 * Represents a page configuration that is also uniquely
 * identified by a path. Mainly used interally to describe
 * vartious routing endpoints.
 */
export type IRoutablePage = IPage & IRoutable;