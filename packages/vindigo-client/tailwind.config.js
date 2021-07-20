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
				'page-background': '#FAF8FE',
				'page-foreground': '#ebe9ef'
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
