<template>
  <div class="login">
    <div class="content">
      <!-- 头部logo -->
      <div class="header">
        <img src="@/assets/logo-home.png" />
      </div>
      <!-- 主体表单 -->
      <div class="main">
        <wInput
          type="text"
          maxlength="11"
          placeholder="用户名/电话"
          v-model="phoneData"
        ></wInput>
        <wInput
          type="password"
          maxlength="11"
          placeholder="密码"
          v-model="passData"
        ></wInput>
      </div>
      <wButton
        text="登 录"
        :rotate="isRotate"
        @click.native="startLogin()"
        class="wbutton"
      ></wButton>

      <!-- 其他登录 -->
      <div class="other_login cuIcon">
        <div class="login_icon">
          <div class="cuIcon-weixin"></div>
        </div>
        <div class="login_icon">
          <div class="cuIcon-weibo"></div>
        </div>
        <div class="login_icon">
          <div class="cuIcon-github" @click="loginGithub"></div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="footer">
        <router-link to="forget">找回密码</router-link>
        <span>|</span>
        <router-link to="register">注册账号</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import wInput from "../components/watch-login/watch-input.vue"; //input
import wButton from "../components/watch-login/watch-button.vue"; //button
import { Toast } from "vant";
export default {
  data() {
    return {
      phoneData: "", //用户/电话
      passData: "", //密码
      isRotate: false //是否加载旋转
    };
  },
  methods: {
    async startLogin() {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (!this.phoneData) {
        Toast("用户名不能为空");
        return;
      }
      if (this.passData.length < 5) {
        Toast("密码不少于5位");
        return;
      }
      this.isRotate = true;
      try {
        let data = { userName: this.phoneData, password: this.passData };
        await this.$store.dispatch("Login", data);
        this.isRotate = false;
        this.$router.replace("home");
      } catch (error) {
        this.isRotate = false;
      }
    },
    //github登录
    loginGithub() {
      const url =
        process.env.NODE_ENV === "production"
          ? "http://106.15.121.64/web/signin_github"
          : "http://localhost:8080/signin_github";
      window.location.href = `https://github.com/login/oauth/authorize?client_id=132c598d286e32f9faea&redirect_uri=${url}`;
    }
  },
  components: {
    wInput,
    wButton
  }
};
</script>

<style>
@import url("../components/watch-login/css/icon.css");
@import url("../assets/css/main.css");
</style>
