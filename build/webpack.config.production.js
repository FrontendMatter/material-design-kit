var config = require('./webpack.config')
module.exports = config.map(function (config) {
  return config.production().getConfig()
})