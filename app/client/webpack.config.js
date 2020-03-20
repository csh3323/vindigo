const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const path = require('path');

// The output path will tell webpack to output the client
// files directly into the http module within the server
// side source directory.
const OUTPUT_PATH = path.resolve(__dirname, '../../dist/client');

module.exports = {
	context: __dirname,
	entry: './src/main.ts',
	output: {
		path: OUTPUT_PATH,
		filename: 'client.js'
	},
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
			'vue$': 'vue/dist/vue.runtime.esm.js'
		},
		extensions: ['.js', '.ts', '.vue']
	},
	performance: {
		hints: false
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
					configFile: path.resolve(__dirname, 'tsconfig.json'),
					transpileOnly: true
				}
			},

			// Load css files
			{
				test: /(\.css|\.scss|\.sass)/,
				use: ['style-loader', 'css-loader', {
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
						sassOptions: {
							fiber: require('fibers'),
						}
					}
				}]
			},

			// Copy over required files
			{
				test: /(\.png|\.svg|\.jpg)/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new VuetifyLoaderPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin({
			vue: true
		}),
		new HtmlPlugin({
			template: path.resolve(__dirname, 'index.html')
		})
	],
	devServer: {
		hot: true,
		port: 8080,
		compress: true,
		historyApiFallback: true,
    	contentBase: 'assets',
		publicPath: '/'
	}
};
