<template>
  <div class="about">
    <ul>
      <li v-for="item in list" :key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'

export default {
  setup () {
    const list = ref([])
    onMounted(() => {
      axios.get('http://127.0.0.1:7001/getTopic').then(res=>{
        list.value=res.data.data
      })
    })
    return { list }
  }
}
</script>
