import { NetworkRequest } from "../api";

export default {
  /**
   * 获取考题
   * @param {Object} exam_id:考试id，user_id:用户id
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
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
