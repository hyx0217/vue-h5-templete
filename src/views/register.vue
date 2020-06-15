<template>
  <div class="register">
    <div class="content">
      <div @click="goBack">X</div>
      <!-- 头部logo -->
      <div class="header">
        <img src="@/assets/logo-home.png" />
      </div>
      <!-- 主体 -->
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
          placeholder="登录密码"
          v-model="passData"
        ></wInput>
        <wInput
          type="number"
          maxlength="4"
          placeholder="验证码1234"
          isShowCode
          ref="codeRef"
          v-model="verCode"
          @setCode="getVerCode()"
        ></wInput>
      </div>

      <wButton
        text="注 册"
        :rotate="isRotate"
        @click.native="startReg()"
      ></wButton>

      <!-- 底部信息 -->
      <div class="footer">
        <span
          @tap="isShowAgree"
          class="cuIcon"
          :class="showAgree ? 'cuIcon-radiobox' : 'cuIcon-round'"
          >同意</span
        >
        <!-- 协议地址 -->
        <span>《协议》</span>
      </div>
    </div>
  </div>
</template>

<script>
import wInput from "@/components/watch-login/watch-input.vue";
import wButton from "@/components/watch-login/watch-button.vue";
import { register } from "@/api/login.ts";
import { Toast } from "vant";

export default {
  data() {
    return {
      phoneData: "", // 用户/电话
      passData: "", //密码
      verCode: "", //验证码
      showAgree: true, //协议是否选择
      isRotate: false //是否加载旋转
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    isShowAgree() {
      //是否选择协议
      this.showAgree = !this.showAgree;
    },
    getVerCode() {
      //获取验证码
      if (this.phoneData.length != 11) {
        Toast("手机号不正确");
        return false;
      }
      this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
      setTimeout(() => {
        this.$refs.runCode.$emit("runCode", 0); //假装模拟下需要 终止倒计时
      }, 60000);
    },
    async startReg() {
      //注册
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (!this.showAgree) {
        Toast("请先同意《协议》");
        return false;
      }
      if (this.phoneData.length != 11) {
        Toast("手机号不正确");
        return false;
      }
      if (this.passData.length < 6) {
        Toast("密码长度最少六位");
        return false;
      }
      if (this.verCode !== "1234") {
        Toast("验证码不正确");
        return false;
      }
      this.isRotate = true;
      try {
        await register({ userName: this.phoneData, password: this.passData });
        Toast("注册成功");
        this.isRotate = false;
        this.goBack();
      } catch (error) {
        this.isRotate = false;
      }
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
