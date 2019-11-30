const getters = {
  token: state => state.user.token,
  tradeDetailData: state => state.blockManagement.tradeDetailData,
  blockDetailData: state => state.blockManagement.blockDetailData,
  editConent: state => state.utils.editConent,
}

export default getters
