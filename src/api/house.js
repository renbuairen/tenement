import request from '@/utils/request'

export const addNeedElement = () => {
    return request({
        url: '/houses/params'

    })
}

export const toHouse = (supporting, roomType, floor, oriented, price, size, description, community, houseImg, title) => {
    return request({
        url: '/user/houses',
        method: 'post',
        data: {
            supporting, // 家电
            roomType, // 户型
            floor, // 楼层
            oriented, // 朝向
            price, // 价钱
            size, // 大小
            description, // 房屋描述
            community, // 城市代码
            houseImg, // 图片地址
            title // 标题
        }
    })
}

export const getImage = (file) => {
    return request({

        url: '/houses/image',
        method: 'post',
        data: file

    })
}

export const getCommunity = (name, id) => {
    return request({
        url: '/area/community',
        params: { name, id }
    })
}

// 房屋管理收藏
export const getFavorate = (id) => {
    return request({
        url: `/user/favorites/${id}`
    })
}

export const addFavorate = (id) => {
    return request({
        url: `/user/favorites/${id}`,
        method: 'post'
    })
}

export const removeFavorate = (id) => {
    return request({
        url: `/user/favorites/${id}`,
        method: 'delete'
    })
}

// 点击获取房屋信息
export const getFavorateInfo = (id) => {
    return request({
        url: `/houses/${id}`
    })
}

// 获取地图房屋列表
export const getHouseInfo = (cityId) => {
    return request({
        url: '/houses',
        params: {
            cityId
        }
    })
}

// 获取filter条件
export const getFilterInfo = (cityId) => {
    return request({
        url: '/houses/condition',
        params: {
            id: cityId
        }
    })
}

// 根据条件查询房子
export const getInfoHouse = (start, end, cityId, area, subway, rentType, price, more) => {
    return request({
        url: '/houses',
        params: {
            start,
            end,
            cityId,
            area,
            subway,
            rentType,
            price,
            more
        }
    })
}
