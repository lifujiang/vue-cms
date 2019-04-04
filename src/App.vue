<template>
  <div class="app-container">

    <!-- 顶部 -->
    <mt-header fixed title="固定在顶部">
        <mt-button icon="back" slot="left" @click="goBack" v-if="hidden">返回</mt-button>
    </mt-header>

    <!-- 中间路由控制区域 -->
    <transition>
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
        <span class="mui-icon iconfont icon-gouwuche"><span class="mui-badge" id="badge">{{ $store.state.totalCount }}</span></span>
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
      hidden: false,
      index: 0
    }
  },
  watch: {
    '$route': 'isHidden'
  },
  created () {
    this.isHidden()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    isHidden () {
      for (var item of hiddenList) {
        if (this.$route.path === item) {
          this.hidden = false
          return
        }
      }
      this.hidden = true
    }
  }
}
</script>


<style lang="scss">
/* 顶部 */
  .app-container{
    /* 加padding的目的是因为顶部是浮动的, 会覆盖内容 */
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
    // 文字内容自动换行
    white-space:normal;  
    word-break:break-all;  
    .mint-header.is-fixed {
      z-index: 99;
    }
  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all .5s ease;
  }
</style>
