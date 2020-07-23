<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/logo-home.png" />
    </div>
    <div class="flex">用户名：{{ user.userName }}</div>
    <vitualList class="flex-1" style="height:100%" :list="list"></vitualList>
    <!--  <div class="mtb-20"
           v-for="item in list"
           :key="item.id">
        <img :src="item.img" />
        <div>{{ item.name }}</div>
      </div> -->
  </div>
</template>
<script>
import { getMuchList } from '@/api/login.js';
import { mapGetters } from 'vuex';
import vitualList from '@/components/vitualList/index';
export default {
  components: {
    vitualList
  },
  data() {
    return {
      list: [],
      queryParams: { page: 1, size: 5 },
      loading: false,
      finished: false
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async getList() {
      let res = await getMuchList();
      this.list = res.data;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style>
@import url('../../assets/css/main.css');

.container{
  height: 100%;
}
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
