import axios from '@/libs/api.request'

/**
 * 导入项目材料
 * @param { String } pName 项目名称
 * @param { String } file 文件
 */
export const importMaterial = (pName, file) => {
  let params = new URLSearchParams()
  params.append('pName', pName)
  params.append('file', file)
  return axios.request({
    url: '/admin/proMaterial/importMaterial',
    data: params,
    method: 'post'
  })
}
