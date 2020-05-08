<template>
  <div class="about">
    <ul>
      <li v-for="item in list"
          :key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { getTopic } from '@/api/common.js'
export default {
  setup () {
    const list = ref([])
    onMounted(async () => {
      let res = await getTopic();
      console.lo
      list.value = res.data;
    })
    return { list }
  }
}
</script>
