import { NetworkRequest } from "../api";

export default {
  /**
   * 获取考题--fine
   * @param {Object} train_id:考试id
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
   */
  async requestQuestionList(data) {
    const res = await NetworkRequest({
      url: "/train/getTrainQuestionList", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 添加训练--fine
   * @param {Object}
   *    "sub_id":课程id,
        "user_id":用户id,
        "score":分数,
        "diff":区分度,
        "kind":[10,10,0,0,0] 题型
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
   */
  async addTest(data) {
    const res = await NetworkRequest({
      url: "/train/IntensiveTrain", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 结束训练--fine
   * @param {Object} train_id:考试id，user_id:用户id
   *
   * @returns {Promise<Object>}
   */
  async endExam(data) {
    const res = await NetworkRequest({
      url: "/train/handInTrain", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 查询学生所选课程--fine
   * @param {Object} "user_id":用户id
   *
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
   */
  async requestStuSub(data) {
    const res = await NetworkRequest({
      url: "/subject/getStuAllSubject", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
  /**
   * 查询学生历史训练--fine
   * @param {Object} "user_id":用户id
   *
   *
   * @returns {Promise<Object>} single:[],judge:[],discussion:[],program:[]
   */
  async requestStuTrain(data) {
    const res = await NetworkRequest({
      url: "/train/getAllTrain", //接口
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
      url: "/train/judgeProgram", //接口
      method: "post", //请求method
      // postHeaderType: "application/x-www-form-urlencoded", //请求头格式
      data,
    });
    return res.data;
  },
};
