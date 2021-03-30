<template>
  <div id="judgeQuestion" class="flex-col">
    <el-card class="single_card">
      <label class="question_type">判断题</label>
      <div
        class="question_box flex-col"
        v-for="item in this.judgeQuestionList"
        :key="item.question"
      >
        <div class="single_row">
          <label class="index">1.</label>
          <label class="timu">{{ item.question }}</label>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer" label="A" class="op_row"> 正确 </el-radio>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer" label="B" class="op_row"> 错误 </el-radio>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    // 父组件传值，index：下标，SingleQ：单选题
    // index: {
    //     type: Number,
    //   required: true,
    // },
    judgeQuestionList: {
      required: false,
    },
  },
  data() {
    return {
      answer: "",
      optionA:
        "aasssaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      optionB: "ss",
      optionC: "dv",
      optionD: "cd",
      question:
        "nihszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzssssssssssssssssssssssssssssssssssssssssssssssssssdxsu",
      info: {},
    };
  },
  created() {
    // this.Question();
    console.log(this.judgeQuestionList);
  },
  watch: {
    // answer(val) {
    //   this.info = {
    //     question_id: this.SingleQ.question_id,
    //     answer: val,
    //     score: 0,
    //     type: "Single",
    //     num: this.index + 1,
    //   };
    //   this.$emit("func", this.info); // 学生答题时，实时向父组件传值（父组件统一提交所有答案）
    // },
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
