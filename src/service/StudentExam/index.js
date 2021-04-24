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
   * 获取学生考试list--fine
   * @param {Object} user_id:用户id
   *
   * @returns {Promise<Object>} exam_name:考试名，exam_id:考试id,exam_status:考试状态,last_time:时长,begin_time:开始时间,tea_name:老师，co_name:课程
   */
  async requestExamList(data) {
    const res = await NetworkRequest({
      url: "/exam/getStuAllExam", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
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
