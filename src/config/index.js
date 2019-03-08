export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '正元后台',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   *
   *
   *
   */
  useI18n: false,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  // homeName: 'home',
  homeName: 'home',
  /**
   * @description api请求基础路径
   */
  baseUrl: {
<<<<<<< HEAD
=======
    /** 正式服务器 */
    // dev: 'https://lzdxservice.sandianke.com/',
    // pro: 'https://lzdxservice.sandianke.com/',
    // qiniuUrl: 'https://lzdxservice.sandianke.com/'
    /** 测试服务器 */
>>>>>>> 5b6435a6cf4014d5b29004a47e38097b58f84546
    dev: 'http://192.168.31.19:80',
    pro: 'http://192.168.31.19:80',
    qiniuBaseUrl: 'http://192.168.31.19'
  }
}
