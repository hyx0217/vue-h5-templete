<template>
  <div>
    <h3 class="login-out" @click="logOut">退出</h3>
    <div class="header">
      <img src="@/assets/logo-home.png" />
    </div>
    <div class="flex">用户名：{{ user.userName }}</div>
    <router-link to="muchList">虚拟列表</router-link>
    <vant-list
      class="flex-col list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <div class="mtb-20" v-for="item in list" :key="item.id">
        <img :src="item.img" />
        <div>{{ item.name }}</div>
      </div>
    </vant-list>
  </div>
</template>
<script>
import { List } from "vant";
import { getList } from "@/api/login.js";
import { mapGetters } from "vuex";
export default {
  components: {
    vantList: List
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
    ...mapGetters(["user"])
  },
  methods: {
    logOut() {
      this.$store.dispatch("Logout");
      this.$router.replace("login");
    },
    async getList() {
      try {
        if (this.finished) return;
        this.loading = true;
        let res = await getList(this.queryParams);
        this.list = [...this.list, ...res.data.list];
        this.finished = this.list.length >= res.data.total;
        this.loading = false;
        this.queryParams.page++;
      } catch (error) {
        this.loading = false;
        this.finished = true;
        console.log(error);
      }
    }
  }
};
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
