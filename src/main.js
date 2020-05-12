import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getToken } from './utils/auth'
router.beforeEach((to, from, next) => {
  console.log(getToken())
  if (getToken()) {
    if (to.path === '/login') {
      next('/home')
    }
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
