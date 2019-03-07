import axios from '@/libs/api.request'

/**
 *  后台新增用户
 * @param {Object} data
 */
export const adminUserAdd = (data) => {
  return axios.request({
    url: '/admin-user/add',
    data,
    method: 'post'
  })
}

/**
 * 后台查询用户列表
 */
export const AdminQueryUsers = () => {
  return axios.request({
    url: '/admin-user/queryUsers',
    method: 'get'
  })
}

/**
 *  后台新增用户
 * @param {String} id
 */
export const queryUserById = (userId) => {
  return axios.request({
    url: '/admin-user/queryUserById?userId=' + userId,
    method: 'get'
  })
}

/**
 *  后台编辑用户
 * @param {Object} data
 */
export const adminUserUpdate = (data) => {
  console.log(data)
  return axios.request({
    url: '/admin-user/update',
    data,
    method: 'post'
  })
}
