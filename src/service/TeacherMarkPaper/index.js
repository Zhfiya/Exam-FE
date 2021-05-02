import { NetworkRequest } from "../api";

export default {
  /**
   * 获取学生答题--fine
   * @param {Object} exam_id:考试id
   *
   * @returns {Promise<Object>}
   */
   async requestStudentAnswer(data) {
    const res = await NetworkRequest({
      url: "/exam/getDiscussion", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 判题--fine
   * @param {Object} exam_id:考试id	"stu_id":学生id，"scoreList"：分数列表
   *
   * @returns {Promise<Object>}
   */
   async markPaper(data) {
    const res = await NetworkRequest({
      url: "/exam/handInScore", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 判题结束--fine
   * @param {Object} exam_id:考试id
   *
   * @returns {Promise<Object>}
   */
   async markAllPaper(data) {
    const res = await NetworkRequest({
      url: "/exam/completeJudge", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
