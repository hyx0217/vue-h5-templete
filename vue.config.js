const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  chainWebpack: (config) => {
    // 关闭预加载
    //  config.plugins.delete('prefetch');
    //  config.plugins.delete('preload');
    config.resolve.alias.set("@", resolve("src"));
    // 忽略生成环境打包的文件
    var externals = {
      vue: "Vue",
      axios: "axios",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      // vant: 'Vant'
    };
    config.externals(externals);
    // cdn可替换成自己服务器上的，更加稳定
    const cdn = {
      css: [],
      js: [
        // vue
        "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js",
        // vue-router
        "https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.min.js",
        // vuex
        "https://cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js",
        // axios
        "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
      ],
    };
    config.plugin("html").tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
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
