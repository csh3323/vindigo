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
	 * The public URL to this page in the format '/path/to/resource'.
	 * Path segments may contain dynamic parameters in order to pass
	 * dynamic content into pages.
	 * 
	 * Example: '/board/:id'
	 */
	path: string;

	/**
	 * The display title of this page, used as page title.
	 */
	name: string;

	/**
	 * The root component to render on this page
	 */
	view: VueConstructor<Vue>;

}