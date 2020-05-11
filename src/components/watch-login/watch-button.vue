<template>
  <div>
    <!-- 按钮 -->
    <button :class="['buttonBorder',!_rotate?'dlbutton':'dlbutton_loading']"
            :style="{'background':bgColor, 'color': fontColor}">
      <div :class="_rotate?'rotate_loop':''">
        <span v-if="_rotate"
              class="cuIcon cuIcon-loading1 "></span>
        <span v-if="!_rotate">{{ text }}</span>
      </div>
    </button>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  props: {
    text: String, //显示文本
    rotate: {
      //是否启动加载
      type: [Boolean, String],
      default: false,
    },
    bgColor: {
      //按钮背景颜色
      type: String,
      default: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))",
    },
    fontColor: {
      //按钮字体颜色
      type: String,
      default: "#FFFFFF",
    },
  },
  setup (props) {
    const _rotate = computed(() => String(props.rotate) !== 'false');
    return { _rotate }
  }
}
</script>

<style>
@import url("./css/icon.css");
.dlbutton {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30px;
  width: 601px;
  height: 100px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
  box-shadow: 0px 0px 13px 0px rgba(164, 217, 228, 0.4);
  border-radius: 2.5rem;
  margin: 0 auto;
  outline: none;
}
.dlbutton_loading {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30px;
  width: 100px;
  height: 100px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
  box-shadow: 0px 0px 13px 0px rgba(164, 217, 228, 0.4);
  border-radius: 2.5rem;
  margin: 0 auto;
  outline: none;
}
.buttonBorder {
  border: none;
  border-radius: 2.5rem;
  -webkit-box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.2);
  -webkit-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -moz-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -ms-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -o-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
}

/* 旋转动画 */
.rotate_loop {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 1s linear infinite;
  -moz-animation: rotate 1s linear infinite;
  -o-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>