var WebpackConfig = require('themekit-webpack-config')
var camelCase = require('camelcase')
var entries = [
	'material-design-kit',
	'box/index',
	'drawer/index',
	'drawer-layout/index',
	'header/index',
	'header-layout/index',
	'reveal/index',
]

module.exports = entries.map(function (entry, index) {
	var name = entry.match(/(.*)\//)
	name = name ? name[1] : entry

	var library = camelCase('mdk-' + name)
	var config = new WebpackConfig()
	
	if (index === 0) {
		library = 'MDK'
		config.withStandaloneEntry(entry)
	}
	else {
		config.withStandaloneEntry(name, entry)
	}

	return config
		.withLibrary(library)
		.webpack({
			sassLoader: {
				importer: require('sass-importer-npm')
			},
			sassImportLoader: {
				base: './src/_variables.scss'
			},
			externals: [{
				'dom-factory': {
					root: 'domFactory',
					commonjs2: 'dom-factory',
					commonjs: 'dom-factory',
					amd: 'dom-factory'
				}
			}]
		})
		.use('extract')
})