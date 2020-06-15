import Vue from "vue";
import Router,{ RouteConfig }  from "vue-router";
Vue.use(Router);

const routes:Array<RouteConfig> = [
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ "../views/home/index.vue")
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
    redirect: "home"
  }
];
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
