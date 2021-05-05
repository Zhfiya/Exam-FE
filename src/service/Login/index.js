import { NetworkRequest } from "../api";

export default {
  /**
   * 登录--fine
   * @param {Object} 
   *
   * @returns {Promise<Object>}
   */
  async requestLogin(data) {
    const res = await NetworkRequest({
      url: "/login/phone", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 退出登录--fine
   * @param {Object} 
   *
   * @returns {Promise<Object>}
   */
   async requestLogOut() {
    const res = await NetworkRequest({
      url: "/login/logout", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
    });
    return res.data;
  },
};
