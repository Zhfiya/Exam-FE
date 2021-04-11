<template>
  <div id="discussionQuestion" class="flex-col">
    <el-card class="single_card">
      <label class="question_type">简答题</label>
      <div
        class="question_box flex-col"
        v-for="(item, index) in this.discussionQuestionList"
        :key="item.question"
      >
        <div class="single_row">
          <label class="index">{{ index + 1 }}.</label>
          <label class="timu">{{ item.question }}</label>
        </div>
        <div class="single_row op">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            autosize
            v-model="answer[index]"
            @paste.native.capture.prevent="handlePaste"
          >
          </el-input>
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
    discussionQuestionList: {
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
    if (localStorage.getExpire("discussionAnswer")) {
      this.answer = localStorage.getExpire("discussionAnswer").answer;
    }
  },
  watch: {
    answer(val) {
      this.info = {
        answer: val,
        type: "discussion",
      };
      this.$emit("getInfo", this.info); // 学生答题时，实时向父组件传值（父组件统一提交所有答案）
      localStorage.setExpire("discussionAnswer", this.info, 1000000); // 将答案存到localStorage里，定义过期时间，这里的10000000大概是四个小时
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import "../../../../style/common.less";
#discussionQuestion {
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
