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

export type ThemeVariant = 'light' | 'dark';