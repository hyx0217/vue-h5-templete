<template>
  <div>
    <div class="header">
      <img src="@/assets/logo-home.png" />
    </div>
    <div class="flex">用户名：{{user.userName}}</div>
    <div>
      <div v-for="item in list" :key="item.id">
        <img :src="item.img">
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { reactive, onMounted, ref } from 'vue'
import { getList } from '@/api/login.js'
export default {
  setup () {
    const store = useStore()
    const user = reactive(store.state.user);
    const list=ref([])
    const queryParams=reactive({page:1,size:10})
    onMounted(async () => {
      let res = await getList(queryParams)
      list.value=[...res.data.list,list.value]
    })
    return { user,list }
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
</style>