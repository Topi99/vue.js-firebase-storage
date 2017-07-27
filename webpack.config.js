module.exports = {
	entry: __dirname + '/src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
			{test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader' },
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.html$/, loader: 'html-loader'}
		]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
}