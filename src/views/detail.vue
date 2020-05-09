<template>
  <div class="about">
    <div v-html="info.content"></div>
  </div>
</template>
<script>
import { onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import { getTopicDetail } from '@/api/common.js'
export default {
  setup () {
    const route =useRoute();
    const info = ref({})
    onMounted(async () => {
      let res = await getTopicDetail({id:route.query.id});
      info.value = res.data;
    })
    return { info }
  }
}
</script>
