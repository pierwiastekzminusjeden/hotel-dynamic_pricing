const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}, 
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
			
		],
		
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/static',
		publicPath: '/',
		filename: 'main.js'
	},
	devServer: {
		contentBase: './templates',
		port: 3000,
		hot: true
	},
	performance: {
  		hints: process.env.NODE_ENV === 'production' ? "warning" : false
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: "React - webpack - babel template",
		  	template: './templates/index.html',
		})
	  ],
}
