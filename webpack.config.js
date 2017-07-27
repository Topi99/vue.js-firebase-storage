module.exports = {
	entry: __dirname + '/src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
}