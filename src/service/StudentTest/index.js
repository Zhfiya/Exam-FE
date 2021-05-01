import { NetworkRequest } from "../api";

export default {
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
};
