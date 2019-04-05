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
    createGoods (state, obj) {
      state.totalCount += obj.count
      if (state.goods.length === 0) {
        state.goods.push(obj)
        return
      }
      for (const i of state.goods) {
        if (i.id === obj.id) {
          i.count += obj.count
          return
        }
      }
      state.goods.push(obj)
    },
    addGoodsCount (state, { count }) {
      state.totalCount++
      count++
    },
    removeGoods (state, item) {
      var goods = state.goods
      var i = goods.findIndex(res => {
        return res.id === item.id
      })
      goods.splice(i, 1)
      this.commit('changeGoodsCount')
    },
    minusGoodsCount (state, { count }) {
      state.totalCount--
      count--
    },
    changeGoodsCount (state) {
      var totalnum = 0
      for (const i of state.goods) {
        totalnum += i.count
      }
      state.totalCount = totalnum
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
