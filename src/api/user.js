import request from '@/utils/request'

/**
 *
 * @param {String} username
 * @param {String} password
 * @returns Promise
 */

export const login = (username, password) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: { username, password }
    })
}

export const getUserInfo = () => {
    return request({
        url: '/user'

    })
}

export const getFavorateList = () => {
    return request({
        url: '/user/favorites'
    })
}

export const getToRentList = () => {
    return request({
        url: '/user/houses'
    })
}
