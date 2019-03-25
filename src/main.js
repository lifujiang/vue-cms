// 导入vue包
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
// 导入 vue-resource
import VueResource from 'vue-resource'

// 导入样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/iconfont.css'
import 'vant/lib/vant'

// 导入入口文件
import app from './App.vue'

// 导入自己的路由模块文件
import router from './router.js'

// 导 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 导入 cube, scroller 部分
import Cube from 'cube-ui'
// 导入 vue-preview
import VuePreview from 'vue-preview'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.use(VueResource)
Vue.use(MintUI)
Vue.use(Cube)
Vue.use(VuePreview)

// 指定 vue-resource 根路径
Vue.http.options.root = 'http://localhost:3030/'

Vue.http.options.emulateJSON = true

// 安装路由
Vue.use(VueRouter)

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router // 挂载路由
})
