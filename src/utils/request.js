import axios from 'axios'

// 请求拦截器
// import store from 'vuex'

const request = axios.create({
    baseURL: 'http://liufusong.top:8080',
    timeout: 3000
})

// request.interceptors.request.use(function (config) {
//     const { token } = store.state
//     // 请求发起会经过这里
//     if (token) {
//         console.log(`Bearer ${token}`)
//         config.headers.Authorization = `${token}`
//     }
//     return config
// },
//     function (error) {
//         // 请求还没有发出去就出错了
//         return Promise.reject(error)
//     })

export default request
