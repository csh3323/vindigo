/**
 * The configuration of a single theme. Themes primarily
 * consist of a color scheme coupled with a variant.
 */
export interface IThemeProvider {

	/** The public display name */
	name: string;

	/** The theme variant, either light or dark */
	variant: ThemeVariant;

	/** The color scheme configuration */
	scheme: IColorScheme;

}

/**
 * The color scheme mapping of a theme
 */
export interface IColorScheme {
	[key: string]: string;
}

/**
 * The visual display variant of a theme, either light or dark
 */
export enum ThemeVariant {
	LIGHT, DARK
}

/**
 * The configuration values for a single theme
 */
export interface IThemeConfig {

	/**
	 * The unique identifier of this theme
	 */
	id: string;

	/**
	 * The displayname of this theme
	 */
	name: string;

	/**
	 * The variant type of this theme
	 */
	variant: ThemeVariant;

	/**
	 * The colorscheme definition of this theme
	 */
	colorscheme: IColorScheme

}