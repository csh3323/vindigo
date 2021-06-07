/**
 * The icon button describes an icon-only button
 * which invoked the specified handler when clicked.
 */
export interface IconButton {

	/**
	 * The icon to render
	 */
	icon: string;

	/**
	 * The optional hover tooltip
	 */
	tooltip?: string;

	/**
	 * The handler invoked when the button is clicked
	 */
	handler: () => void;
}