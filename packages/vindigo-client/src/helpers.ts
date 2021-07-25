import { TranslationKey } from "./typings/types";

export const MENU_DIVIDER = Symbol('menu-divider');

/**
 * Represents an item displayed in the
 * toolbar creation menu.
 */
export interface ToolbarCreationItem {
	icon: string,
	title: TranslationKey,
	description: TranslationKey,
	handler: Function|string
}