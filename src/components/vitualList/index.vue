<template>
  <div ref="list"
       class="v-container"
       @scroll="scrollEvnet">
    <div class="pat-list"
         :style="{'height':padHeight+'px'}"></div>
    <div class="list"
         :style="{'transform': translateY}">
      <div class="item"
           :style="{height:itemHeight+'px'}"
           v-for="(item,index) in filterList"
           :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    itemHeight: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      startIndex: 0,
      endIndex: 0,
      translateY: '',
    };
  },
  computed: {
    filterList() {
      return this.list.slice(this.startIndex, Math.min(this.endIndex,this.list.length));
    },
    padHeight() {
      return this.list.length * this.itemHeight;
    }
  },
  methods: {
    scrollEvnet() {
      //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      this.startIndex = Math.floor(scrollTop / this.itemHeight);
      this.endIndex = this.startIndex + Math.floor(this.$el.clientHeight / this.itemHeight);
      this.translateY = `translateY(${scrollTop-(scrollTop % this.itemHeight)}px)`;
    }
  },
  mounted() {
    this.startIndex = 0;
    this.endIndex = Math.floor(this.$el.clientHeight / this.itemHeight);
  }
};
</script>

<style lang="scss" scoped>
.v-container {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .pat-list {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .list {
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    position: absolute;
    z-index: 1;
  }
}
.item {
  display: flex;
  align-items: center;
  height: 200px;
  border-top: 1px solid #ccc;
}
</style>
