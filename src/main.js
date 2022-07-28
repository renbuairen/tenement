import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/fonts/iconfont.css'

// 百度地图
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'QcAyg9H6aju71TCSPZnirs9pgFSr85C6'
})

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
