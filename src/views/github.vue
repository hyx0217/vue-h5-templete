<script>
import { useRoute,useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { register } from '@/api/login.js'
export default {
  setup () {
    const store = useStore();
    const route = useRoute()
    const router = useRouter()
    const githubAuth = async () => {
      const data = {
        client_id: '132c598d286e32f9faea',
        client_secret: '4454ab611ff98ae9bbbb388c682b30cf9e795207',
        code: route.query.code
      }
      axios.post('/githubAccessToken', data).then(res => {
        const access_token = res.data.split('&')[0].split('=')[1]
        axios.get(`/githubUserInfo`, { params: { access_token } }).then(async result => {
          let obj = {
            userName: result.data.email,
            password: 123456
          }
          try {
            //未注册
            await register(obj);
            await store.dispatch('Login', obj)
            router.replace('home')
          } catch (error) {
            //已注册直接登录
            await store.dispatch('Login', obj)
            router.replace('home')
          }
        }).catch(() => {
          alert('token已过期')
        })
      })
    }
    onMounted(() => {
      githubAuth()
    })
  }
}
</script>