import { NetworkRequest } from "../api";

export default {
  /**
   * 添加考试--fine
   * @param {Object} sub_id:学科id，user_id:用户id，exam_name:考试名字，begin_time:开始时间，last_time:持续时间
   *
   * @returns {Promise<Object>} exam_id:试卷id
   */
  async teacherAddExam(data) {
    const res = await NetworkRequest({
      url: "/exam/saveExam", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 修改考试--fine
   * @param {Object} sub_id:学科id，user_id:用户id，exam_name:考试名字，begin_time:开始时间，last_time:持续时间
   *
   * @returns {Promise<Object>} exam_id:试卷id
   */
  async teacherUpdateExam(data) {
    const res = await NetworkRequest({
      url: "/exam/saveExam", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 终止考试--fine
   * @param {Object} user_id:用户id，exam_id:考试id
   *
   * @returns {Promise<Object>}
   */
  async teacherEndExam(data) {
    const res = await NetworkRequest({
      url: "/exam/endExam", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
