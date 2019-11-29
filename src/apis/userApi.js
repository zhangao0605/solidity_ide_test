import request from '../utils/request'

export default {
  loginByPassword (userName, password) {
    return request({
      url: '/api/login/pwd',
      method: 'post',
      data: { userName, password }
    })
  },
  register (userName, password) {
    return request({
      url: '',
      method: 'post',
      data: { userName, password }
    })
  },
  getPermissions () {
    return request({
      url: '',
      method: 'get'
    })
  },
  /**
   * 获取手机验证码
   */
  getPhoneCode () {
    return request({
      url: '',
      method: 'get'
    })
  },
  /**
   * 验证手机验证码
   * @param phoneNumber
   * @param code
   */
  checkPhoneCode (phoneNumber, code) {
    return request({
      url: '',
      method: 'post',
      data: { phoneNumber, code }
    })
  },
  /**
   * 获取图形验证码
   */
  getImgCode () {
    return request({
      url: '',
      method: 'get'
    })
  },
  /**
   * 检查账户
   * @param account
   * @param imgCode
   */
  checkAccount (account, imgCode) {
    return request({
      url: '',
      method: 'post',
      data: { account, imgCode }
    })
  },
  /**
   * 重置密码
   * @param password
   */
  resetPassword (password) {
    return request({
      url: '',
      method: 'post',
      data: { password }
    })
  }
}
