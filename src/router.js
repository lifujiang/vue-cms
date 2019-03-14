import VueRouter from 'vue-router'

// 导入 tabbar 显示的相应组件
import HomePage from './components/tabbar/HomePage.vue'
import MemberPage from './components/tabbar/MemberPage.vue'
import CartPage from './components/tabbar/CartPage.vue'
import SearchPage from './components/tabbar/SearchPage.vue'
import NewsList from './components/news/NewsList.vue'
import NewDetail from './components/news/NewsDetail.vue'
import PhotoList from './components/photo/photoList.vue'
import PhotoDetail from './components/photo/photoDetail.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/newslist', component: NewsList },
    { path: '/newsdetail/:id', component: NewDetail, props: true }, // 这里是通过 props 属性解耦属 params 属性
    { path: '/photoList', component: PhotoList },
    { path: '/photodetail/:id', component: PhotoDetail, props: true }, // 这里是通过 props 属性解耦属 params 属性
    { path: '/member', component: MemberPage },
    { path: '/cart', component: CartPage },
    { path: '/search', component: SearchPage }
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router
