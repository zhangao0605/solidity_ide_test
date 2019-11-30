const state = {
  editConent:'嗲滴艾迪爱死爱',
}

const mutations = {
  SET_EDIT_CONTENT (state, data) {
    state.editConent = data
  },
}

const actions = {
  setEditConent({commit}, data) {
    commit('SET_EDIT_CONTENT', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
