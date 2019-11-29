import { getToken } from '../../utils/token'

const state = {
  // 用户登录状态唯一标识
  token: getToken(),

  // 用户信息
  userInfo: null,

  // 权限列表
  permissionList: [],

  // 最后登录时间
  loginLastTime: sessionStorage.getItem('loginLastTime') - 0
}

const getters = {
  isLogin (state) {
    return !!state.token
  }
}

const mutations = {
  SET_TOKEN (state) {
    state.token = getToken()
  },
  SET_USER_INFO (state, info) {
    state.userInfo = info
  },
  // 删除用户相关信息
  REMOVE_USER_INFO (state) {
    state.userInfo = null
  },
  // 设置权限列表
  SET_PERMISSION_LIST (state, list) {
    state.permissionList = list
  },
  // 删除权限列表
  REMOVE_PERMISSION_LIST (state) {
    state.permissionList = null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
