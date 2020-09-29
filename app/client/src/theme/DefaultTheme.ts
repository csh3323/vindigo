import { IThemeConfig, IColorScheme, ThemeVariant } from './Theme';

export class DefaultTheme implements IThemeConfig {

	name: string = "Default Light";

	variant = "light" as const

	colorscheme: IColorScheme = { 
		'': ''
	}

}

export {
	
}