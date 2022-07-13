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
