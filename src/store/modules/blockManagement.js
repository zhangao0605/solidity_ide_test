const state = {
    //交易详情参数
    tradeDetailData: {},
    blockDetailData: {}
}

const mutations = {
    SET_TRADE_DATA (state, data) {
        state.tradeDetailData = data
    },
    SET_BLOCK_DATA (state, data) {
        state.blockDetailData = data
    },
}

const actions = {
    setTradeDetail({commit}, data) {
        commit('SET_TRADE_DATA', data)
    },
    setBlockDetail({commit}, data) {
        commit('SET_BLOCK_DATA', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
