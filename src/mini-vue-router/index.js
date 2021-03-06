import Vue from 'vue'
import VueRouter from './mini-vue-router'
import Home from '../views/Home.vue'

// 1.VueRouter是一个vue插件使用Vue.use完成注册
// use调用的时候回执行内部install方法
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
