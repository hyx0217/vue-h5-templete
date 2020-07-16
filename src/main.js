import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { getToken } from "./utils/auth";
// import { Lazyload } from 'vant';

Vue.config.productionTip = false;
/* 图片懒加载，设置默认图片 */
/* Vue.use(Lazyload,{
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
}) */
router.beforeEach((to, from, next) => {
  //白名单路由
  const whiteUrl = ["/login", "/forget", "/register", "/signin_github"];
  if (getToken()) {
    if (to.path === "/login") {
      next("/home");
    } else {
      store.dispatch("GetUser");
    }
    next();
  } else {
    if (whiteUrl.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
