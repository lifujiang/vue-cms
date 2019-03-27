<template>
  <div class="swiperPage">
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in list" :key="item.img">
        <img :src="item.img" alt :class="{ 'wfull': isFull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ['list', 'isFull']
}
</script>

<style lang="scss" scope>
  .swiperPage {
    // 轮播图样式
    .mint-swipe {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      text-align: center;
      height: 200px;
      img {
        height: 100%;
      }
    }
    .wfull {
      width: 100%;
    }
  }
</style>
