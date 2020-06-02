const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const entry = TARGET_NODE ? 'server' : 'client';
const merge = require('lodash.merge');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/web' : '/',
  pages: {
    index: {
      entry: `src/entry.${entry}.js`,
      template: 'public/index.html',
    },
  },
  chainWebpack: (config) => {
    // 关闭vue-loader中默认的服务器端渲染函数
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap((options) => {
            merge(options, {
                optimizeSSR: false,
            });
        });
},
  configureWebpack: {
    name: 'vue3',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    // 需要开启source-map文件映射，因为服务器端在渲染时，
    // 会通过Bundle中的map文件映射关系进行文件的查询
    devtool: 'source-map',
    // 服务器端在Node环境中运行，需要打包为类Node.js环境可用包（使用Node.js require加载chunk）
    // 客户端在浏览器中运行，需要打包为类浏览器环境里可用包
    target: TARGET_NODE ? 'node' : 'web',
    // 关闭对node变量、模块的polyfill
    node: TARGET_NODE ? undefined : false,
    output: {
      // 配置模块的暴露方式，服务器端采用module.exports的方式，客户端采用默认的var变量方式
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
    },
    // vue-cli4.0，webpack打包默认采用分包，服务端打包不能用分包，会报错。
    optimization: {splitChunks: TARGET_NODE ? false : undefined},
    plugins: [
      // 根据之前配置的环境变量判断打包为客户端/服务器端Bundle
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
    ],
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
};
