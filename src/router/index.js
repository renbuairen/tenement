import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout/home' },
  { path: '/layout', redirect: '/layout/home' },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    children: [
      { path: '/layout/home', component: () => import('@/views/home') },
      { path: '/layout/list', component: () => import('@/views/list') },
      { path: '/layout/profile', component: () => import('@/views/profile') },
      { path: '/layout/news', component: () => import('@/views/news') }
    ]
  },
  { path: '/login', component: () => import('@/views/login') }
]

const router = new VueRouter({
  routes
})

export default router
