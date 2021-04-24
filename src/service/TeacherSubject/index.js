import { NetworkRequest } from "../api";

export default {
  /**
   * 获取课程--fine
   * @param {Object} user_id:用户id
   *
   * @returns {Promise<Object>} sub_id:课程id,sub_name:课程，stu_num:人数,description:描述
   */
  async teacherGetCourse(data) {
    const res = await NetworkRequest({
      url: "/subject/getTeaAllSubject", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 获取课程下的考试--fine
   * @param {Object} user_id:用户id,sub_id:课程id
   *
   * @returns {Promise<Object>} exam_status: 状态,last_time: 时长,begin_time: 开始时间,exam_name: 考试
   */
  async teacherGetCourseExam(data) {
    const res = await NetworkRequest({
      url: "/exam/getTeaSubjectExam", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
