import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home")
  },
  {
    path: "/muchList",
    name: "muchList",
    component: () => import(/* webpackChunkName: "muchList" */ "../views/home/list")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register.vue")
  },
  {
    path: "/forget",
    name: "forget",
    component: () =>
      import(/* webpackChunkName: "forget" */ "../views/forget.vue")
  },
  {
    path: "/signin_github",
    name: "github",
    component: () =>
      import(/* webpackChunkName: "github" */ "../views/github.vue")
  },
  {
    path: "",
    redirect: "home",
    component: () => import("../views/home")
  }
];

export default new Router({ routes });
