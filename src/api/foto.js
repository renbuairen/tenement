import request from '@/utils/request'

export const getPic = () => {
    return request({
        url: '/home/swiper'
    })
}

export const getRentPic = (area) => {
    return request({
        url: '/home/groups',
        params: {
            area
        }
    })
}
