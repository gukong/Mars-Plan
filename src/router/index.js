import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Canvas from '@/pages/canvas/index'

Vue.use(Router)

const routes = [
  {path: '/', name: 'index', component: Index},
  {path: '/canvas', name: 'canvas', component: Canvas}
]

export default new Router({
  mode: 'history',
  routes: routes
})
