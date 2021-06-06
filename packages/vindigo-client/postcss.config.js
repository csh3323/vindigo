const mixins = {
	emissive(_, color, alpha) {
		const hex = color.replace('#', '');
		const r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
		const g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
		const b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
		const final = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (alpha || 0.85) + ')';

		return {
			'&': {
                boxShadow: '6px 6px 40px ' + final
            }
		}
	}
};

module.exports = {
	plugins: [
		require('postcss-nested'),
		require('tailwindcss'),
		require('postcss-mixins')({ mixins }),
		require('autoprefixer'),
	]
};
