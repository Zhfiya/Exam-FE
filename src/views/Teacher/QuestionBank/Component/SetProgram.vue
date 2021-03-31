<template>
  <div id="setProgram" class="flex-col">
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
      <div class="ques_row flex-col">
        <div>
          <label>标准样例:</label>
          <el-button icon="el-icon-plus" size="small" circle @click="Addstd()"></el-button>
        </div>
        <div class="example flex-col">
          <p>样例输入</p>
          <el-input
            v-for="(item, index) in answerInput"
            :key="item.index"
            type="textarea"
            v-model="answerInput[index]"
            autosize
          ></el-input>
          <p>样例输出</p>
          <el-input
            v-for="(it, index) in answerOutput"
            :key="it.index"
            type="textarea"
            v-model="answerOutput[index]"
            autosize
          ></el-input>
          <p>注：一个输入框为一个输入/输出，若本题无输入，不填标准样例</p>
        </div>
      </div>
      <div class="ques_row flex-row">
        <label>参考答案:</label>
        <el-input
          placeholder="请输入参考答案"
          v-model="correctAnswer"
          type="textarea"
          autosize
        ></el-input>
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
      <div class="button_row">
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
      answerOutput:[''],
      answerInput:[''],
      correctAnswer: "",
      tag: "",
      score: 0,
      options: [
        {
          value: "A",
        },
        {
          value: "B",
        },
        {
          value: "C",
        },
        {
          value: "D",
        },
      ],
    };
  },
  methods: {
    Addstd() { // 添加样例
      this.answerInput.push('');
      this.answerOutput.push('');
    },
    deleteQues() {
      this.question = "";
      this.answerOutput=[''];
      this.answerInput=[''];
      this.tag = "";
      this.score = 0;
      this.correctAnswer = "";
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../style/common.less";
#setProgram {
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
          margin-left: 10px;
      }
        .example {
            /deep/ .el-textarea__inner {
                background-color: @background;
                border: 0;
                margin-top: 10px;
                font-weight: bold;
            }
            width: 100%;
            p {
                text-align: left;
                font-weight: bold;
                padding: 10px 0;
            }
        }
    }
    .button_row {
      /deep/ .el-button {
        margin-top: 4px;
        height: 30px;
        padding: 5px 10px;
        border: 0;
        background-color: @correlateColor2;
        color: @white;
      }
      .clear {
        margin-left: 20px;
        background-color: @warningColor;
      }
    }
  }
}
</style>
