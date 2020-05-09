<template>
  <div class="about">
    <ul>
      <li v-for="item in list"
          :key="item.id"
          @click="toDetail(item.id)">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref,getCurrentInstance } from 'vue'
import { getTopic } from '@/api/common.js'
export default {
  setup () {
    const { ctx } = getCurrentInstance();
    const list = ref([]);
    onMounted(async () => {
      let res = await getTopic();
      list.value = res.data;
    })
    const toDetail=(id)=>{
        ctx.$router.push(`/detail?id=${id}`)
    }
    return { list,toDetail }
  }
}
</script>
