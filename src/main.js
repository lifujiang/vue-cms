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
    totalCount: 0,
    goods: []
  },
  getters: {
    showCartCount (state) {
      return state.cartCount
    }
  },
  mutations: {
    // 添加商品到购物车(state)
    createGoods (state, obj) {
      state.totalCount += obj.count
      // 状态内商品数组是否存在元素, 不存在则直接 push (空数组不能遍历)
      if (state.goods.length === 0) {
        state.goods.push(obj)
        return
      }
      // 以存在的商品则通过循环添加
      for (const i of state.goods) {
        if (i.id === obj.id) {
          i.count += obj.count
          return
        }
      }
      // 不存在状态内的商品将 push 进去
      state.goods.push(obj)
    },
    // 商品增加指定数量
    addGoodsCount (state, { count, num = 1 }) {
      state.totalCount += num
      count += num
    },
    // 删除商品
    removeGoods (state, item) {
      var goods = state.goods
      // 找到索引并删除该条数组元素
      var i = goods.findIndex(res => {
        return res.id === item.id
      })
      goods.splice(i, 1)
      // 重新获取总数
      this.commit('changeGoodsCount')
    },
    // 商品减少指定数量
    minusGoodsCount (state, { count, num = 1 }) {
      state.totalCount -= num
      count -= num
    },
    // 当商品数量改变时重新获取总数
    changeGoodsCount (state) {
      // 临时数值
      var tempNum = 0
      // 通过循环重新获取总数
      for (const i of state.goods) {
        tempNum += i.count
      }
      state.totalCount = tempNum
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
