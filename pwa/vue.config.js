module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 8080
  },
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map'
  },
  pluginOptions: {
    gitDescribe: {
      variableName: 'GIT_DESCRIBE'
    }
  }
}
