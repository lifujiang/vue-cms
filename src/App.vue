<template>
  <div class="app-container">

    <!-- 顶部 -->
    <mt-header fixed title="固定在顶部">
        <mt-button icon="back" slot="left" @click="goBack" v-if="!isIndexPage">返回</mt-button>
    </mt-header>

    <!-- 中间路由控制区域 -->
    <!-- 使用 out-in 模式可以解决切换出现滚动条的问题 -->
    <transition mode="out-in"
    @before-leave="beforeLeave"
    @before-enter="beforeEnter"
    @after-leave="afterLeave"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    >
      <!-- 渲染路由子组件页面 -->
      <router-view></router-view>
    </transition>
    <!-- 底部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/cart">
        <span class="mui-icon iconfont icon-gouwuche"><span class="mui-badge" id="badge">{{ $store.getters.showCartCount }}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
const hiddenList = [ '/home', '/member', '/cart', '/search' ]
export default {
  data () {
    return {
      isIndexPage: true,
      index: 0
    }
  },
  watch: {
    '$route': 'isHidden'
  },
  computed: {
    
  },
  created () {
    this.isHidden()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 是否为主页面
    isHidden () {
      for (var item of hiddenList) {
        if (this.$route.path === item) {
          this.isIndexPage = true
          return
        }
      }
      this.isIndexPage = false
    },
    beforeEnter (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      // 主页面不使用 transform 动画, 否则与 fixed 会产生冲突
      if (!this.isIndexPage) el.style.transform = 'translateX(100%)'
      el.offsetWidth
      el.style.position = 'relative'
      el.style.transition = 'all .5s ease'
      done()
    },
    afterEnter (el) {
      if (!this.isIndexPage) el.style.transform = 'translateX(0%)'     
      el.style.opacity = 1
    },
    beforeLeave (el) {
      el.style.opacity = 0
    },
    leave (el, done) {
      if (!this.isIndexPage) el.style.transform = 'translateX(-100%)'
      el.offsetWidth
      el.style.transition = 'all .5s ease'
      done()
    },
    afterLeave (el) {
      if (!this.isIndexPage) el.style.transform = 'translateX(0%)'
      el.style.opacity = 1
    }
  }
}
</script>


<style lang="scss">
/* 顶部 */
  .app-container{
    /* 加padding的目的是因为顶部是浮动的, 会覆盖内容 */
    position: relative;
    padding-top: 40px;
    padding-bottom: 100px;
    overflow-x: hidden;
    // 文字内容自动换行
    white-space:normal;  
    word-break:break-all;  
    .mint-header.is-fixed {
      z-index: 99;
    }
  }

</style>
