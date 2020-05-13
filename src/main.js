import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getToken } from './utils/auth'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
router.beforeEach((to, from, next) => {
  //白名单路由
  const whiteUrl = ['/login', '/forget', '/register','/signin_github']
  if (getToken()) {
    if (to.path === '/login') {
      next('/home')
    } else {
      store.dispatch('GetUser')
    }
    next()
  } else {
    if (whiteUrl.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
