/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

/* eslint-disable no-undef */
module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{vue,ts}'],
	darkMode: 'class',
	important: true,
	theme: {
		extend: {
			colors: {
				'gray': colors.trueGray,
				'gray-150': '#efefef',
				'page-background': '#FAF8FE',
				'page-foreground': '#ebe9ef',
				'page-foreground-dark': '#262626'
			}
		},
		fontFamily: {
			'sans': ['Ubuntu', 'ui-sans-serif', 'system-ui'],
			'mono': ['JetBrains Mono', 'ui-monospace', 'Consolas', 'system-ui']
		},
		container: {
			center: true,
			padding: '2rem'
		},
		screens: {
			'mobile': '640px',
			'laptop': '1024px',
			'desktop': '1400px'
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
