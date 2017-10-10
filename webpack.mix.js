const { mix } = require('laravel-mix')

const components = [
  'box',
  'drawer',
  'drawer-layout',
  'header',
  'header-layout',
  'reveal',
  'carousel'
]

mix.js('node_modules/laravel-mix/src/builder/mock-entry.js', 'mix.js')
  .js('src/index.js', 'dist/material-design-kit.js')
  .sass('src/style.scss', 'dist/material-design-kit.css')

components.forEach(component => {
  mix.sass(`src/${component}/${component}.scss`, 'dist')
  mix.js(`src/${component}`, 'dist')
})

mix.webpackConfig({
  output: {
    library: 'MDK',
    libraryTarget: 'umd'
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