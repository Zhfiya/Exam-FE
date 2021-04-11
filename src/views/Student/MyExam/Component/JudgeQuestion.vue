<template>
  <div id="judgeQuestion" class="flex-col">
    <el-card class="single_card">
      <label class="question_type">判断题</label>
      <div
        class="question_box flex-col"
        v-for="(item, index) in this.judgeQuestionList"
        :key="item.question"
      >
        <div class="single_row">
          <label class="index">{{ index + 1 }}.</label>
          <label class="timu">{{ item.question }}</label>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer[index]" label="A" class="op_row">
            正确
          </el-radio>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer[index]" label="B" class="op_row">
            错误
          </el-radio>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    judgeQuestionList: {
      required: false,
    },
  },
  data() {
    return {
      answer: [],
      question: "",
      info: {},
    };
  },
  created() {
    // 取出localStorage里的答案
    if (localStorage.getExpire("judgeAnswer")) {
      this.answer = localStorage.getExpire("judgeAnswer").answer;
    }
  },
  watch: {
    answer(val) {
      this.info = {
        answer: val,
        type: "judge",
      };
      this.$emit("getInfo", this.info); // 学生答题时，实时向父组件传值（父组件统一提交所有答案）
      localStorage.setExpire("judgeAnswer", this.info, 10000000); // 将答案存到localStorage里，定义过期时间，这里的10000000大概是四个小时
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import "../../../../style/common.less";
#judgeQuestion {
  .single_card {
    width: 100%;
    height: 60%;
    .question_type {
      color: @primaryColor;
      font-weight: bold;
      font-size: large;
    }
    .question_box {
      margin-top: 20px;
      .single_row {
        margin-bottom: 10px;
        .timu {
          word-wrap: break-word;
          word-break: break-all;
          text-align: left;
          margin-left: 5px;
          color: @primaryText;
        }
      }
      .op_row {
        color: @regularText;
        margin-left: 10px;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
}
</style>
