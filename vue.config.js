const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: "/",
  configureWebpack: {
    name: 'vue3',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    open: true,
    https: false,
    proxy: {
      // GitHub请求token的请求
      '/githubAccessToken': {
        target: 'https://github.com/login/oauth/access_token',
        changeOrigin: true,
        pathRewrite: {
          '^/githubAccessToken': '',
        },
      },
      // GitHub请求token的请求
      '/githubUserInfo': {
        target: 'https://api.github.com/user',
        changeOrigin: true,
        pathRewrite: {
          '^/githubUserInfo': '',
        },
      },
    },
  },
}
