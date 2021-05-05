import { NetworkRequest } from "../api";

export default {
  /**
   * 登录--fine
   * @param {Object} 
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
   */
  async requestLogin(data) {
    const res = await NetworkRequest({
      url: "/login", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
