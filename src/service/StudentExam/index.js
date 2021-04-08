import { NetworkRequest } from "../api";

export default {
  /**
   * 获取考题
   * @param {Object}
   *
   * @returns {Promise<Object>}
   */
  async requestQuestionList(data) {
    const res = await NetworkRequest({
      url: "/exam/getQuestionList", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
