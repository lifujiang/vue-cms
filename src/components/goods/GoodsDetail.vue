<template>
  <div class="goodsDetailPage">
    <transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    mode="in-out">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :list="goodsSwiperList" :isFull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 销售部分 -->
    <div class="mui-card about_buy">
      <div class="mui-card-header header">{{ goodsDetailList.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价 : <span class="old">&yen;{{ goodsDetailList.market_price }}</span>
            销售价 : <span class="new">&yen;{{ goodsDetailList.sale_price }}</span>
          </p>
          <div class="stepper">
            <span>购买数量 :&nbsp;</span>
            <van-stepper
            v-model="value"
            :max="goodsDetailList.stock_quantity"
            integer
            />
          </div>
          <div class="btn">
            <van-button type="info">立即购买</van-button>
            <van-button type="danger" @click="addToCart">加入购物车</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情及评论 -->
    <div class="mui-card info">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner goodsInfo">
          <p>商品货号 : <span>{{ goodsDetailList.goods_num }}</span></p>
          <p>库存情况 : <span>{{ goodsDetailList.stock_quantity }}件</span></p>
          <p>上架时间 : <span>{{ goodsDetailList.add_time }}</span></p>
        </div>
      </div>
      <div class="mui-card-footer btn">
        <van-button plain size="large" @click="rcmdHandle" type="info">图文介绍</van-button>
        <van-button plain size="large" @click="cmtHandle" type="danger">商品评论</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import { Toast } from 'mint-ui'
export default {
  props: ['id'],
  data () {
    return {
      goodsSwiperList: [],
      goodsDetailList: [],
      value: 1,
      ballFlag: false,
    }
  },
  created () {
    this.getGoodsSwiper()
    this.getGoodsDetail()
  },
  computed: {
    // 判断添加购物车数量是否大于已添加量
    lackStock () {
      return this.$store.getters.lackStock(this.goodsDetailList.id)
    }
  },
  methods: {
    // 获取轮播图
    getGoodsSwiper () {
      this.$api.goodsSwiper({
        id: this.id
      })
      .then(res => {
        if (res.data.status === 0) {
          this.goodsSwiperList = res.data.list
        } else {
          Toast('载入商品轮播图失败')
        }
      })
      .catch(err => {
        this.$api.error(err)
      })
    },

    // 获取商品信息
    getGoodsDetail () {
      this.$api.goodsDetail({
        id: this.id
      })
      .then(res => {
        if (res.data.status === 0) {
          this.goodsDetailList = res.data.list
        } else {
          Toast('载入商品详情失败')
        }
      })
      .catch(err => {
        this.$api.error(err)
      })
    },

    // 评论和图文详情编程式路由
    rcmdHandle () {
      this.$router.push({ path: '/goodsrecommend/' + this.id })
    },
    cmtHandle () {
      this.$router.push({ path: '/goodscmt/' + this.id })
    },

    // 添加购物车按钮事件
    addToCart () {
      // 给当前商品添加数量 count 属性
      var goodsDetailList = this.goodsDetailList
      // 获取当前商品数据
      var cartObj = {
        id: goodsDetailList.id,
        count: this.value,
        stock_quantity: goodsDetailList.stock_quantity,
        selected: false,
        remain_stock: goodsDetailList.stock_quantity,
        sale_price: goodsDetailList.sale_price,
        title: goodsDetailList.title,
        src: goodsDetailList.src
      }
      // 使用 commit 方法改变 state
      this.$store.commit('createGoods', cartObj)
      // 商品购买上限在 mutaitions 提前处理, 这里只需要完成超过购买上限的提示
      if (this.$store.state.lackStock) {
        return Toast('库存已被掏空(｀・ω・´)')
      }
      // 库存未满的时候显示小球动画
      this.ballFlag = !this.ballFlag
    },

    // 动画钩子函数
    beforeEnter (el) {
      el.style.transform = "translate(0, 0)"
      el.style.opacity = 1
    },
    enter (el, done) {
      // getBoundingClientRect 方法获取元素与页面的位置关系
      // 得到小球的起点与终点位置关系
      var ball = this.$refs.ball.getBoundingClientRect()
      var badge = document.getElementById('badge').getBoundingClientRect()
      el.offsetWidth
      el.style.transform = `translate(${badge.left - ball.left}px, ${badge.top - ball.top}px)`
      el.style.transition = 'transform .3s cubic-bezier(.4,-0.3,1,.69)'
      done()
    },
    afterEnter (el) {
      this.ballFlag = !this.ballFlag
    }
  },
  components: {
    swiper
  }
}
</script>

<style lang="scss" scope>
  .goodsDetailPage {
    overflow: hidden;
    background-color: #eee;
    .about_buy {
      // 解决垃圾插件导致的相邻组件抖动问题
      -webkit-transform-style: preserve-3d;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      .header {
        font-size: 18px;
      }
      .price {
        color: #000;
        padding: 15px 0;
        .old {
          font-size: 12px;
          text-decoration: line-through;
        }
        .new {
          color: red;
          font-size: 16px;
        }
      }
      .stepper {
        display: flex;
        span { line-height: 30px; }
        .van-stepper {
          // 增步器输入框, 此时被 mui 框架样式污染只能自定义样式
          // 在使用 vant 框架代替其他框架后记得修改!!!!!!!!!!!!!!!!
          .van-stepper__input {
            width: 45px;
            height: 28px;
            padding: 0;
            margin: 0;
            border-radius: 0;
            border-left: 0;
            border-right: 0;
            font-size: 18px;
          }
          // 增步器按钮, 同上
          .van-stepper__minus, .van-stepper__plus {
            border: 1px solid rgba(0,0,0,.2);
            margin: 0;
            padding: 0;
            width: 40px;
            height: 30px;
          }
        }
      }
      .btn {
        padding: 10px 0;
      }
    }
    .info {
      // 解决垃圾插件导致的相邻组件抖动问题
      -webkit-transform-style: preserve-3d;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      .goodsInfo {
        padding: 15px;
        p {
          padding-bottom: 10px;
        }
      }
      .btn {
        display: block;
        .van-button {
          margin: 5px 0;
          height: 44px;
          line-height: 44px;
        }
      }
    }
    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      background-color:red;
      top: 402px;
      left: 146px;
      z-index: 99;
    }
  }
</style>