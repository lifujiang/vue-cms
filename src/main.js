// 导入vue包
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
// 导入 vue-resource
import VueResource from 'vue-resource'

// 导入样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/iconfont.css'

// 导入入口文件
import app from './App.vue'

// 导入自己的路由模块文件
import router from './router.js'

// 按需导入 mint-ui 组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Cube from 'cube-ui'

Vue.use(MintUI)
Vue.use(Cube)

// 安装 vue-resource
Vue.use(VueResource)

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
