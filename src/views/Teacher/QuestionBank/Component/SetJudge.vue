<template>
  <div id="setJudge" class="flex-col">
    <div class="ques_box">
      <div class="ques_row flex-row">
        <label>题目:</label>
        <el-input
          placeholder="请输入题目"
          v-model="question"
          type="textarea"
          autosize
        ></el-input>
      </div>
      <div class="ques_row flex-row">
        <label>答案:</label>
        <el-select v-model="correctAnswer">
          <el-option
            v-for="item in options"
            :key="item.valuse"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-divider></el-divider>
      <div class="ques_row flex-row">
        <label>知识点:</label>
        <el-input placeholder="请输入知识点" v-model="tag" clearable></el-input>
      </div>
      <div class="ques_row flex-row">
        <label>分值:</label>
        <el-input placeholder="请输入分值" v-model="score" clearable></el-input>
      </div>
      <div class="ques_row flex-row">
        <label>难易程度:</label>
        <el-select v-model="level">
          <el-option
            v-for="item in levels"
            :key="item.index"
            :label="item.value"
            :value="item.index"
          ></el-option>
        </el-select>
      </div>
      <div class="ques_row">
        <el-button @click="s(item)">提交</el-button>
        <el-button @click="deleteQues()" class="clear">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    score(val) {
      if (!val) {
        this.$message({
          message: "警告哦，分值输入不能为空！",
          type: "warning",
        });
      } else if (!Number(val)) {
        this.$message({
          message: "警告哦，分值输入不是数字！",
          type: "warning",
        });
      }
    },
  },
  data() {
    return {
      question: "",
      correctAnswer: "",
      tag: "",
      score: "",
      level: 0,
      options: [
        {
          value: "正确",
        },
        {
          value: "错误",
        },
      ],
      levels: [
        {
          value: "简单",
          index: 0,
        },
        {
          value: "中等",
          index: 1,
        },
        {
          value: "困难",
          index: 2,
        },
      ],
    };
  },
  methods: {
    s(item) {
      console.log(item);
    },
    deleteQues() {
      this.question = "";
      this.tag = "";
      this.score = 0;
      this.correctAnswer = "";
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../style/common.less";
#setJudge {
  padding: 10px;
  margin-bottom: 50px;
  .ques_box {
    color: @regularText;
    .ques_row {
      margin: 15px 0;
      label {
        line-height: 40px;
        width: 80px;
      }
      /deep/ .el-input {
        width: 90%;
      }
      /deep/ .el-textarea {
        width: 90%;
      }
      /deep/ .el-button {
        margin-left: 20px;
        margin-top: 4px;
        height: 30px;
        padding: 5px 10px;
        border: 0;
        background-color: @correlateColor2;
        color: @white;
      }
      .clear {
        background-color: @warningColor;
      }
    }
  }
}
</style>
