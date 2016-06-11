var config = require('./webpack.config')
module.exports = config.map(function(config) {
  return config.dev({ devtool: 'eval-source-maps' }).getConfig()
})