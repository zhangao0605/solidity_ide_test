import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getAppBaseUrl } from './host'

const service = axios.create({
  baseURL: getAppBaseUrl(),
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    let token = 'store.getters.token'
    if (token) {
      config.headers['token'] = token
    }
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    // 设置请求的语言
    config.headers['Locale'] = ''
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    if (res.code === 200) {
      return res
    } else {
      if (res.code === 100001 || res.code === 100002 || res.code === 100003) {
        store.dispatch('login/FedLogOut').then(() => {
          location.reload()
        })
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(res.msg)
    }
  },
  error => {
    let msg = ''
    if (error == 'Error: timeout of 5000ms exceeded') {
      msg = '无效请求！请求超时！'
    } else {
      msg = error.message
    }
    Message({
      message: msg,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
