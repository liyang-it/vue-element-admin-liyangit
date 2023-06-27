import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // 接口地址 如果是 线上 参考 ".env.production" 文件, 如果是开发环境 参考 ".env.devduction"，如果 开发环境使用代理 ，请参考 "vue.config" 代理配置
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 请求超时时间  毫秒
})

// 请求拦截器
service.interceptors.request.use(

  config => {
    // do something before request is sent
    console.info('使用请求工具')
    // 在这里可以添加 请求头配置，token、等信息
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 请求(客户端)异常配置
    console.log('请求异常', error) // for debug
    return Promise.reject(error)
  }
)
// 请求响应拦截配置
const duration = 15 * 1000
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 这里可以 根据 请求后端返回的状态码统一处理不同响应

    if (res.code === 601) {
      // 未登录
      removeToken()
      return Promise.reject(new Error(res.msg))
      // eslint-disable-next-line no-unreachable
      setTimeout(() => {
        location.reload()
      }, 50)
    } else if (res.code === 502) {
      // 账户在其他地方登录
      MessageBox.confirm('您的账号在别处登录,您可以取消继续留在该页面,或者重新登录?', '提示', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '留在该页面',
        type: 'warning'
      }).then(() => {
        location.reload()
      }).catch(() => { })

      return Promise.reject(new Error(res.message || 'Error'))
    } else if (res.code === 501) {
      // 异常操作
      Notification.error({
        title: '错误',
        message: '<div style="width: 270px;word-wrap: inherit;font-size: 10px;">' + res.msg + '</div',
        duration: duration,
        dangerouslyUseHTMLString: true
      })
      return Promise.reject(new Error(res.msg || '系统异常'))
    } else {
      // 状态码正常，返回请求结果
      return res
    }
  },
  // 请求响应（服务端）异常
  error => {
    Notification.error({
      title: '错误',
      message: '服务已重启/网络异常!请重试',
      duration: duration
    })
    return Promise.reject(error)
  }
)

export default service
