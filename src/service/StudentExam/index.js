import { NetworkRequest } from "../api";

export default {
  /**
   * 获取考题--fine
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
  /**
   * 获取考试--fine
   * @param {Object} exam_id:考试id，user_id:用户id
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
   */
  //  async requestQuestionList(data) {
  //   const res = await NetworkRequest({
  //     url: "/exam/getQuestionList", //接口
  //     method: "post", //请求method
  //     // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
  //     data,
  //   });
  //   return res.data;
  // },
  /**
   * 编程题判题--fine
   * @param {Object} exam_id:考试id，user_id:用户id,code:代码,language:语言,question_id:题目id
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
   */
  async judgeProgram(data) {
    const res = await NetworkRequest({
      url: "/exam/judgeProgram", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
