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
  /**
   * 老师出题--fine
   * @param 	"exam_id":考试id,"kind":题目类型,"content":题目描述,"answer":答案,
	            "tip":提示,
	            "options":选项,
              "user_id":用户id,
              "hard":难度,
              "diff":区分度,
              "importance":重要性,
              "chapter":知识点
   *
   * @returns {Promise<Object>}
   */
  async teacherSaveQuestion(data) {
    const res = await NetworkRequest({
      url: "/exam/saveQuestion", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 获取知识点--fine
   * @param {Object} sub_id:课程id
   *
   * @returns {Promise<Object>}
   */
  async getKonwPonit(data) {
    const res = await NetworkRequest({
      url: "/subject/getSubjectChapter", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
