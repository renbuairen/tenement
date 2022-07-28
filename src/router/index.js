import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      { path: '/ ', component: () => import('@/views/home') },
      { path: '/list', component: () => import('@/views/list') },
      { path: '/news', component: () => import('@/views/news') },
      { path: '/profile', component: () => import('@/views/profile') }
    ]
  },
  {
    path: '/favorate',
    component: () => import('@/views/favorate'),
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/rent',
    component: () => import('@/views/rent'),
    meta: {
      title: '我的出租'
    }
  },
  {
    path: '/city',
    component: () => import('@/views/city'),
    meta: {
      title: '城市列表'
    }
  },
  {
    path: '/toRent',
    component: () => import('@/views/toRent'),
    meta: {
      title: '发布房源'
    },
    beforeEnter: (to, from, next) => {
      if (to.path === '/toRent' && !store.state.token) return next('/login')
      next()
    }
  },
  {
    path: '/mapRent',
    component: () => import('@/views/mapRent'),
    meta: {
      title: '地图找房'
    }
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/details',
    component: () => import('@/views/details')
  }

]

const router = new VueRouter({
  routes
})

export default router
