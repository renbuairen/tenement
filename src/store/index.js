import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    city: (JSON.parse(localStorage.getItem('city')) && JSON.parse(localStorage.getItem('city'))[0]) || '北京',
    cityId: (JSON.parse(localStorage.getItem('city')) && JSON.parse(localStorage.getItem('city'))[1]) || 'AREA|88cff55c-aaa4-e2e0',
    community: '',
    communityId: ''
  },
  getters: {
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload
      // token放在本地存储
      localStorage.setItem('token', payload)
    },
    setCity(state, payload) {
      state.city = (payload && payload[0]) || '北京'
      state.cityId = (payload && payload[1]) || 'AREA|88cff55c-aaa4-e2e0'
    },
    setCommunity(state, payload) {
      state.community = (payload && payload[0]) || '北京'
      state.communityId = (payload && payload[1]) || 'AREA|88cff55c-aaa4-e2e0'
    },
    clearCommunity(state, payload) {
      state.community = payload
      state.communityId = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
