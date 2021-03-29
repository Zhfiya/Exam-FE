export default {
  GET_TOKEN(state, payload) {
    state.userToken = payload;
  },
  GET_USERINFO(state, payload) {
    state.userInfo = payload;
  },
  // [UPDATE_USERROLE](state,payload){
  //   state.userRole = payload;
  // }, // 权限
};
