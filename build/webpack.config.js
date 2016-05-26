var path = require('path')
var WebpackConfig = require('themekit-webpack-config')
var config = new WebpackConfig()
	.withStandaloneEntry('material-design-kit')
	.withLibrary('MDK')
	.webpack({
		sassLoader: {
			importer: require('sass-importer-npm')
		},
		sassImportLoader: {
			base: './src/_variables.scss'
		}
	})
	.use('extract')

module.exports = config