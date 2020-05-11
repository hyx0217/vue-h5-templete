<template>
  <div class="main-list oBorder">
    <!-- 文本框 -->
    <input class="main-input"
           :value="inputValue"
           :type="_type"
           :maxlength="maxlength"
           :placeholder="placeholder"
           :password="type==='password'&&!showPassword"
           @input="onInput" />
    <!-- 是否可见密码 -->
    <img v-if="_isShowPass&&type==='password'&&!_isShowCode"
         class="img cuIcon"
         :class="showPassword?'cuIcon-attention':'cuIcon-attentionforbid'"
         @tap="showPass" />
    <!-- 倒计时 -->
    <div v-if="_isShowCode&&!_isShowPass"
         :class="['vercode',{'vercode-run': second>0}]"
         @click="setCode">{{ getVerCodeSecond }}</div>

  </div>
</template>
<script>
import { computed, ref} from 'vue'
var countDown;
export default {
  props: {
    type: String, //类型
    inputValue: String, //值
    placeholder: String, //框内提示
    maxlength: {
      //最大长度
      type: [Number, String],
      default: 20,
    },
    isShowPass: {
      //是否显示密码图标（二选一）
      type: [Boolean, String],
      default: false,
    },
    isShowCode: {
      //是否显示获取验证码（二选一）
      type: [Boolean, String],
      default: false,
    },
    codeText: {
      type: String,
      default: "获取验证码",
    },
    setTime: {
      //倒计时时间设置
      type: [Number, String],
      default: 60,
    }
  },
/*   model: {
    prop: 'inputValue',
    event: 'input'
  }, */
  setup (props, { emit }) {
    const showPassword = ref(false);//是否显示明文
    const second = ref(0);//倒计时
    const isRunCode = ref(false);//是否开始倒计时
    const showPass = () => {
      //是否显示密码
      showPassword.vlaue = !showPassword.value
    }
    const runCode = (val) => {
      //开始倒计时
      if (String(val) == "0") {
        //判断是否需要终止循环
        second.value = 0; //初始倒计时
        clearInterval(countDown);//清理循环
        isRunCode.value = false; //关闭循环状态
        return false;
      }
      if (isRunCode.value) {
        //判断是否开始倒计时，避免重复点击
        return false;
      }
      isRunCode.value = true
      second.value = props._setTime //倒数秒数
      countDown = setInterval(() => {
        second.value--
        if (second.value === 0) {
          isRunCode.value = false
          clearInterval(countDown)
        }
      }, 1000)
    }
    const onInput = (e) => {
      //传出值
      emit('inputText', e.target.value)
    }
    const setCode = () => {
      //设置获取验证码的事件
      if (isRunCode.value) {
        //判断是否开始倒计时，避免重复点击
        return false;
      }
      emit('setCode')
    }
    const _type = computed(() => {
      //处理值
      const type = props.type
      return type == 'password' ? 'text' : type
    })
    const _isShowPass = computed(() => String(props.isShowPass) !== 'false')
    const _isShowCode = computed(() => String(props.isShowPass) !== 'false')
    const _setTime = computed(() => {
      const setTime = Number(props.setTime)
      return setTime > 0 ? setTime : 60
    })
    const getVerCodeSecond = computed(() => {
      //验证码倒计时计算
      if (second.value <= 0) {
        return props.codeText;
      } else {
        if (second.value < 10) {
          return '0' + second.value;
        } else {
          return second.value;
        }
      }
    })
    return {
      showPassword,
      second,
      isRunCode,
      showPass,
      runCode,
      onInput,
      setCode,
      _type,
      _isShowPass,
      _isShowCode,
      _setTime,
      getVerCodeSecond    }
  }
}
</script>

<style>
@import url("./css/icon.css");
.main-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 36px; /* Input 高度 */
  color: #333333;
  padding: 32px;
  margin-top: 24px;
  margin-bottom: 24px;
}
.img {
  width: 32px;
  height: 32px;
  font-size: 32px;
}
.main-input {
  flex: 1;
  text-align: left;
  font-size: 28px;
  /* line-height: 100px; */
  padding-right: 10px;
  margin-left: 20px;
  border:none;
  outline:none;
}
.vercode {
  color: rgba(0, 0, 0, 0.7);
  font-size: 24px;
  line-height: 100px;
}
.vercode-run {
  color: rgba(0, 0, 0, 0.4) !important;
}
.oBorder {
  border: none;
  border-radius: 2.5rem;
  -webkit-box-shadow: 0 0 60px 0 rgba(43, 86, 112, 0.1);
  box-shadow: 0 0 60px 0 rgba(43, 86, 112, 0.1);
}
</style>
