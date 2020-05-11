<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <h1>text count：{{count}}</h1>
    <h2>double count：{{doubleCount}}</h2>
    <input v-model="count"/>
    <button @click="addCount">+</button>
    <button @click="lowCount">-</button>
    <button @click="toAbout">跳转</button>
    <button @click="goBack">返回</button>

  </div>
</template>

<script>
import { ref, computed, watch, getCurrentInstance } from 'vue'
export default {
    setup () {
      const count = ref(0);
      const addCount = () => {
        count.value++
      }
      const lowCount = () => {
        count.value--
      }
      watch(() => count.value, (val, oldVal) => {
        console.log(`newVla：${val},oldVal：${oldVal}`)
      })
      const doubleCount = computed(() => count.value * 2)
      const { ctx } = getCurrentInstance();
      const toAbout = () => {
        ctx.$router.push('/about')
      }
      const goBack = () => {
        ctx.$router.go(-1)
      }
      return { count, addCount, lowCount, doubleCount, toAbout, goBack }
    }
}
</script>
