import request from '@/utils/request'

export const getHotCity = () => {
    return request({
        url: '/area/hot'
    })
}

export const getAllCity = (num) => {
    return request({
        url: '/area/city',
        params: {
            level: num
        }
    })
}

export const getMapCity = (id) => {
    return request({
        url: '/area/map',
        params: {
            id
        }
    })
}
