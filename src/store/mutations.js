export default {
  GET_TOKEN(state, payload) {
    state.userToken = payload;
  },
  GET_USERINFO(state, payload) {
    state.userInfo = payload;
  },
  GET_SUBID(state, payload) {
    state.subId = payload;
  },
  // [UPDATE_USERROLE](state,payload){
  //   state.userRole = payload;
  // }, // 权限
};
