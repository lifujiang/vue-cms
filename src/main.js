/* 导入模块 */
// vue 包
import Vue from 'vue'

// Vuex 包
import Vuex from 'vuex'
// vue-router
import VueRouter from 'vue-router'
// vue-resource
import VueResource from 'vue-resource'

// 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/iconfont.css'
import 'vant/lib/vant'

// 入口文件
import app from './App.vue'

// 自己的路由模块文件
import router from './router.js'

// 导 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// cube, scroller 部分
import Cube from 'cube-ui'
// vue-preview
import VuePreview from 'vue-preview'
// Vant
import Vant from 'vant'
import 'vant/lib/index.css'

/* 使用模块 */
Vue.use(Vuex)
Vue.use(Vant)
Vue.use(VueResource)
Vue.use(MintUI)
Vue.use(Cube)
Vue.use(VuePreview)

// 声明 Vuex
var store = new Vuex.Store({
  state: {
    goods: [],
    isFull: false
  },
  getters: {
    showCartCount (state) {
      var total = 0
      state.goods.forEach(item => {
        total += item.count
      })
      return total
    },
    isFull: (state) => (id) => {
      state.goods.some(item => {
        if (item.id === parseInt(id)) {
          if (item.remain_stock <= 0) {
            return true
          }
          return false
        }
      })
    },
    totalPrice (state) {
      var totalPrice = 0
      state.goods.forEach(item => {
        if (item.selected) totalPrice += (item.sale_price * item.count)
      })
      return totalPrice
    },
    selectedList (state) {
      var idList = []
      state.goods.forEach(item => {
        if (item.selected) idList.push(item.id)
      })
      return idList
    }
  },
  mutations: {
    // 添加商品到购物车(state)
    createGoods (state, obj) {
      // 以存在的商品则通过循环添加
      var flag = false
      state.goods.some(item => {
        if (item.id === parseInt(obj.id)) {
          flag = true
          if (item.remain_stock - obj.count < 0) {
            state.isFull = true
            return true
          }
          state.isFull = false
          item.remain_stock -= obj.count
          item.count += obj.count
          return true
        }
      })
      // 不存在状态内的商品将 push 进去
      if (!flag) {
        obj.remain_stock -= obj.count
        state.goods.push(obj)
      }
    },
    // 删除商品
    removeGoods (state, obj) {
      var i = state.goods.findIndex(item => {
        return item.id === parseInt(obj.id)
      })
      state.goods.splice(i, 1)
    },
    // 获取输入商品数量
    changeGoodsCount (state, obj) {
      state.goods.some(item => {
        if (item.id === parseInt(obj.id)) {
          item.count = obj.count
          item.remain_stock = item.stock_quantity - obj.count
          return true
        }
      })
    },
    //
    totalNum (state, obj) {
      state.goods.some(item => {
        if (item.id === parseInt(obj.id)) {
          item.selected = obj.selected
        }
      })
    }
  }
})

// 指定 vue-resource 根路径
Vue.http.options.root = 'http://localhost:3030/'

Vue.http.options.emulateJSON = true

// 安装路由
Vue.use(VueRouter)

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, // 挂载路由
  store
})
