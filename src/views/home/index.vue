<template>
  <div>
    <h3 class="login-out"
        @click="logOut">退出</h3>
    <div class="header">
      <img src="@/assets/logo-home.png" />
    </div>
    <div class="flex">用户名：{{user.userName}}</div>
    <div class="flex-col list">
      <div class="mtb-20"
           v-for="item in list"
           :key="item.id">
        <img :src="item.img">
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { reactive, onMounted, ref, computed } from 'vue'
import { getList } from '@/api/login.js'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const store = useStore()
    const user = computed(() => store.getters.user);
    const list = ref([])
    const queryParams = reactive({ page: 1, size: 100 })
    const logOut = () => { store.dispatch('Logout'); router.replace('login') }
    onMounted(async () => {
      let res = await getList(queryParams)
      list.value = [...res.data.list, list.value]
    })
    return { user, list, logOut }
  }
}
</script>
<style>
@import url("../../components/watch-login/css/icon.css");
@import url("../../assets/css/main.css");
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.mtb-20 {
  margin: 20px 0;
}
.login-out {
  position: fixed;
  top: 10px;
  right: 20px;
}
</style>