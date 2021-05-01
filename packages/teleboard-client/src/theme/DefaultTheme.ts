import { IColorScheme, IThemeConfig, ThemeVariant } from './Theme';

export class DefaultTheme implements IThemeConfig {

	id = "default_light";
	name = "Default Light";
	variant = ThemeVariant.LIGHT;

	colorscheme: IColorScheme = { 
		'some-key': '#FF0000'
	}

}