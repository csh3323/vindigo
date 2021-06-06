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
				gray: colors.trueGray
			}
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
