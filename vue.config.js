const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/web" : "/",
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: (config) => {
    /* gzip压缩，nginx需要开启gzip*/
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096,
        })
      );
    }
  },
  devServer: {
    open: true,
    https: false,
    proxy: {
      // GitHub请求token的请求
      "/githubAccessToken": {
        target: "https://github.com/login/oauth/access_token",
        changeOrigin: true,
        pathRewrite: {
          "^/githubAccessToken": "",
        },
      },
      // GitHub请求token的请求
      "/githubUserInfo": {
        target: "https://api.github.com/user",
        changeOrigin: true,
        pathRewrite: {
          "^/githubUserInfo": "",
        },
      },
    },
  },
};
