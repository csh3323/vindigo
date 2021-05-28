const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

const environment = process.env.NODE_ENV
const devtool = (environment === 'development') ? 'eval' : 'source-map';

// Export the full webpack config
module.exports = {
	context: path.resolve(__dirname, "."),
	entry: path.resolve(__dirname, "src/index.ts"),
	mode: environment,
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.runtime.esm.js'
		},
		extensions: [
			'.ts',
			'.vue',
			'.js'
		]
	},
	output: {
		clean: true
	},
	module: {
		rules: [

			// Load vue templates, scripts and styles
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},

			// Load typescript files
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					configFile: path.resolve(__dirname, "tsconfig.json"),
					transpileOnly: true
				}
			},

			// Load css files
			{
				test: /(\.css|\.postcss)/,
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader'
				]
			},

			// Copy over required files
			{
				test: /(\.png|\.svg|\.jpg)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false,
						}
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new ForkTsCheckerWebpackPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		new HtmlPlugin({
			template: path.resolve(__dirname, "public/index.html")
		})
	],
	devServer: {
		hot: true,
		port: 8080,
		compress: true,
		historyApiFallback: true,
		overlay: {
			errors: true,
			warnings: false
		}
	}
};