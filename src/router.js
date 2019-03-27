import VueRouter from 'vue-router'

// 导入 tabbar 显示的相应组件
import TestPage from './components/test.vue'
import HomePage from './components/tabbar/HomePage.vue'
import MemberPage from './components/tabbar/MemberPage.vue'
import CartPage from './components/tabbar/CartPage.vue'
import SearchPage from './components/tabbar/SearchPage.vue'
import NewsList from './components/news/NewsList.vue'
import NewDetail from './components/news/NewsDetail.vue'
import PhotoList from './components/photo/PhotoList.vue'
import PhotoDetail from './components/photo/PhotoDetail.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsDetail from './components/goods/GoodsDetail.vue'
import GoodsRecommend from './components/goods/GoodsRecommend.vue'
import GoodsCMT from './components/goods/GoodsCMT.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/test', component: TestPage },
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/newslist', component: NewsList },
    { path: '/newsdetail/:id', component: NewDetail, props: true }, // 这里是通过 props 属性解耦属 params 属性
    { path: '/photoList', component: PhotoList },
    { path: '/photodetail/:id', component: PhotoDetail, props: true }, // 这里是通过 props 属性解耦属 params 属性
    { path: '/goodslist', component: GoodsList },
    { path: '/goodsdetail/:id', component: GoodsDetail, props: true },
    { path: '/goodsrecommend/:id', component: GoodsRecommend, props: true },
    { path: '/goodscmt/:id', component: GoodsCMT, props: true },
    { path: '/member', component: MemberPage },
    { path: '/cart', component: CartPage },
    { path: '/search', component: SearchPage }
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router
