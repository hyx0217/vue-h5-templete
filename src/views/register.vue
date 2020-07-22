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
        <wInput type="text"
                maxlength="11"
                placeholder="用户名/电话"
                @inputText="(val)=>{phoneData=val}"></wInput>
        <wInput type="password"
                maxlength="11"
                placeholder="登录密码"
                @inputText="(val)=>{passData=val}"></wInput>
        <wInput type="number"
                maxlength="4"
                placeholder="验证码1234"
                isShowCode
                ref="codeRef"
                @inputText="(val)=>{verCode=val}"
                @setCode="getVerCode()"></wInput>

      </div>

      <wButton text="注 册"
               :rotate="isRotate"
               @click="startReg()"></wButton>

      <!-- 底部信息 -->
      <div class="footer">
        <span @tap="isShowAgree"
              class="cuIcon"
              :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">同意</span>
        <!-- 协议地址 -->
        <span>《协议》</span>
      </div>
    </div>
  </div>
</template>

<script>
import wInput from '@/components/watch-login/watch-input.vue' //input
import wButton from '@/components/watch-login/watch-button.vue' //button
import { ref } from 'vue'
import { useRouter} from 'vue-router'
import { register } from '@/api/login.js'
export default {
  setup () {
    const router=useRouter();
    const phoneData = ref(''); // 用户/电话
    const passData = ref('');//密码
    const verCode = ref('');//验证码
    const showAgree = ref(true);//是否加载旋转
    const isRotate = ref(false);//是否加载旋转
    const codeRef = ref(null)//暴露给模板用以获取组件实例，类似this.$refs
    function goBack(){
      router.go(-1)
    }
    const isShowAgree = () => {
      //是否选择协议
      showAgree.value = !showAgree.value;
    }
    const getVerCode = () => {
      //获取验证码
      if (phoneData.value.length != 11) {
        alert('手机号不正确')
        return false;
      }
      console.log("获取验证码")
      codeRef.value.runCode(); //触发倒计时（一般用于请求成功验证码后调用）
      setTimeout(function () {
        codeRef.value.runCode(0); //假装模拟下需要 终止倒计时
      }, 60000)
    }
    const startReg = async () => {
      //注册
      if (isRotate.value) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (!showAgree.value) {
        alert('请先同意《协议》')
        return false;
      }
      if (phoneData.value.length != 11) {
        alert('手机号不正确')
        return false;
      }
      if (passData.value.length < 6) {
        alert('密码长度最少六位')
        return false;
      }
      if (verCode.value !== '1234') {
        alert('验证码不正确')
        return false;
      }
      isRotate.value = true
      try {
        await register({ userName: phoneData.value, password: passData.value })
        alert("注册成功")
        isRotate.value = false
        goBack()
        
      } catch (error) {
        isRotate.value = false
      }
    }
    return {
      phoneData,
      passData,
      verCode,
      showAgree,
      isRotate, isShowAgree, getVerCode, startReg, codeRef,goBack
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