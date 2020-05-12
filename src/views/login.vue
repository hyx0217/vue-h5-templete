<template>
  <div class="login">
    <div class="content">
      <!-- 头部logo -->
      <div class="header">
        <img src="@/assets/logo-home.png" />
      </div>
      <!-- 主体表单 -->
      <div class="main">
        <wInput type="text"
                maxlength="11"
                placeholder="用户名/电话"
                @inputText="(val)=>{phoneData=val}"></wInput>
        <wInput type="password"
                maxlength="11"
                placeholder="密码"
                @inputText="(val)=>{passData=val}"></wInput>
      </div>
      <wButton text="登 录"
               :rotate="isRotate"
               @click.native="startLogin()"
               class="wbutton"></wButton>

      <!-- 其他登录 -->
      <div class="other_login cuIcon">
        <div class="login_icon">
          <div class="cuIcon-weixin"
               @click="login_weixin"></div>
        </div>
        <div class="login_icon">
          <div class="cuIcon-weibo"
               @click="login_weibo"></div>
        </div>
        <div class="login_icon">
          <div class="cuIcon-github"
               @click="login_github"></div>
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
import wInput from '../components/watch-login/watch-input.vue' //input
import wButton from '../components/watch-login/watch-button.vue' //button
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router=useRouter();
    const store = useStore();
    const phoneData = ref('');
    const passData = ref('');
    const isRotate = ref(false);
    const startLogin = async () => {
      //登录
      if (isRotate.value) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (!phoneData.value) {
        alert('用户名不能为空')
        return;
      }
      if (passData.value.length < 5) {
        alert('密码不少于5位')
        return;
      }
      isRotate.value = true
      try {
        let data = { userName: phoneData.value, password: passData.value };
        await store.dispatch('Login', data)
        isRotate.value = false
        router.replace('home')
      } catch (error) {
        isRotate.value = false
      }

    }
    return {
      phoneData,
      passData,
      isRotate,
      startLogin,
    }
  },
  components: {
    wInput,
    wButton,
  }
}
</script>

<style>
@import url("../components/watch-login/css/icon.css");
@import url("../assets/css/main.css");
</style>