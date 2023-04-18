
module.exports = {
  transpileDependencies: true,
  lintOnSave: false,  /* 关闭eslint校验 */

  // webpack相关配置要写在configureWebpack对象中
  configureWebpack: {
    output: {
      clean: true,
    }
  },

  /* 配置代理服务器解决跨域问题 */
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      }
    },
  }
}
