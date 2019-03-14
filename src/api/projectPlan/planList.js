import axios from '@/libs/api.request'

/**
 * 添加项目计划
 * @param { String } pId 项目id
 * @param { String } planTime 计划时间
 * @param { String } inTime 进场时间
 * @param { String } number 编号
 */
export const addProPlan = (pId, planTime, inTime, number) => {
  let params = new URLSearchParams()
  params.append('pId', pId)
  params.append('planTime', planTime)
  params.append('inTime', inTime)
  params.append('number', number)
  return axios.request({
    url: '/proPlan/add',
    data: params,
    method: 'post'
  })
}

/**
 * 查询项目计划列表
 * @param { String } pId 项目id
 * @param { String } pageNum 页码
 * @param { String } pageSize 条数
 */
export const getProPlan = (pId, pageNum, pageSize) => {
  let params = new URLSearchParams()
  params.append('pId', pId)
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  return axios.request({
    url: '/proPlan/getPageList',
    data: params,
    method: 'post'
  })
}

/**
 * 根据材料id查询已选材料id
 * @param { List } mIds 已选材料id的集合
 */
export const materialQuery = (mIds) => {
  let params = new URLSearchParams()
  params.append('mIds', mIds)
  return axios.request({
    url: '/proMaterial/query',
    data: params,
    method: 'post'
  })
}
