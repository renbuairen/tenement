import axios from 'axios'
import store from '@/store'

// 请求拦截器
// import store from 'vuex'

const request = axios.create({
    baseURL: 'http://liufusong.top:8080'
})

request.interceptors.request.use(
    (config) => {
        const token = store.state.token

        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }

)

export default request
