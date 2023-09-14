const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Rachel-Furman-14-09-2023/'
    : '/'
}
