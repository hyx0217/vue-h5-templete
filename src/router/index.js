import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ "../views/home")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/register.vue")
  },
  {
    path: "/forget",
    name: "forget",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forget.vue")
  },
  {
    path: "/signin_github",
    name: "github",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/github.vue")
  },
  {
    path: "",
    redirect: "home",
    component: () => import(/* webpackChunkName: "about" */ "../views/home")
  }
];

export function createRouter(){
  return new Router({ mode: 'history', routes });
} 
