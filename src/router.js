import VueRouter from 'vue-router'

// 导入 tabbar 显示的相应组件
import HomePage from './components/tabbar/HomePage.vue'
import MemberPage from './components/tabbar/MemberPage.vue'
import CartPage from './components/tabbar/CartPage.vue'
import SearchPage from './components/tabbar/SearchPage.vue'
import NewsList from './components/news/NewsList.vue'
import NewDetail from './components/news/NewsDetail.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/newslist', component: NewsList },
    { path: '/newsdetail/:id', component: NewDetail, props: true },
    { path: '/member', component: MemberPage },
    { path: '/cart', component: CartPage },
    { path: '/search', component: SearchPage }
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router
