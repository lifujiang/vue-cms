<template>
  <div>
    <!-- 轮播图 -->
    <swiper :list="lunboList" :isFull="true"></swiper>
    <!-- 九宫格改造的六宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9 home-grid">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/newslist">
            <img src="../../images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/photoList">
            <img src="../../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/goodslist">
            <img src="../../images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu6.png" alt="">
            <div class="mui-media-body">练习我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
export default {
  data() {
    return {
      lunboList: []
    }
  },
  created() {
    this.lunbo()
  },
  methods: {
    lunbo() {
      this.$http.get('lunbo').then(res => {
        if(res.body.status == 0) {
          // 成功了
          this.lunboList = res.body.list
        } else {
          Toast('图片加载失败')
        }
      })
    }
  },
  components: {
    swiper
  }
}
</script>

<style lang="scss" scoped>

// 六宫格(改)样式
.mui-grid-view.mui-grid-9{
  // 解决垃圾插件导致的相邻组件抖动问题
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  // It belongs to home-page-grid-ul
  background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  // It belongs to home-page-grid-li
    border: none;
    img {
      width: 60px;
      height: 60px;
    }
  }
</style>
