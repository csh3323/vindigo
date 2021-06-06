/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

/* eslint-disable no-undef */
module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{vue,ts}'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				'gray': colors.trueGray,
				'page-background': '#FAF8FE'
			}
		},
		fontFamily: {
			'sans': ['Open Sans', 'ui-sans-serif', 'system-ui'],
			'mono': ['JetBrains Mono', 'ui-monospace', 'Consolas', 'system-ui']
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
