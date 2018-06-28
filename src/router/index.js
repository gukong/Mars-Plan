import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/pages/index'/* webpackChunkName: "Index" */)
const Canvas = () => import('@/pages/canvas/index'/* webpackChunkName: "canvas" */)

Vue.use(Router)

const routes = [
  {path: '/', name: 'index', component: Index},
  {path: '/canvas', name: 'canvas', component: Canvas}
]

export default new Router({
  mode: 'history',
  routes: routes
})
