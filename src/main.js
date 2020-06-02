import Vue from "vue";
import App from "./App.vue";
import { getToken } from "./utils/auth";
import {createRouter} from './router';
import {createStore} from './store';
export function createApp() {
  const router = createRouter();
  const store = createStore();
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
  const app = new Vue({
      router,
      store,
      render: (h) => h(App),
  });
  return {app, router, store};
}

