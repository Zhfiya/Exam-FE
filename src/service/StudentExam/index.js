import { NetworkRequest } from "../api";

export default {
  /**
   * 获取考题
   * @param {Object}
   *
   * @returns {Promise<Object>}
   */
  async requestCardFile() {
    const res = await NetworkRequest({
      url: "", //接口
      method: "get", //请求method
      postHeaderType: "application/x-www-form-urlencoded", //请求头格式
    });
    return res.data;
  },
};
