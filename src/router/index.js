import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () =>
    import(/* webpackChunkName: "about" */ '../views/home')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
    import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
    import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () =>
    import(/* webpackChunkName: "about" */ '../views/forget.vue')
  },
  {
    path: '/signin_github',
    name: 'github',
    component: () =>
    import(/* webpackChunkName: "about" */ '../views/github.vue')
  },
  {
    path: '',
    redirect: 'home',
    component: () =>
    import(/* webpackChunkName: "about" */ '../views/home')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
