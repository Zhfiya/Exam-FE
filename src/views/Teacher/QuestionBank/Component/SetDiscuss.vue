<template>
  <div id="setDiscuss" class="flex-col">
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
        <el-input
          placeholder="请输入答案"
          v-model="correctAnswer"
          type="textarea"
          autosize
        ></el-input>
      </div>
      <el-divider></el-divider>
      <div class="ques_row flex-row">
        <label>知识点:</label>
        <el-select v-model="tag">
          <el-option
            v-for="item in chapters"
            :key="item.chapter_id"
            :value="item.chapter_id"
            :label="item.chapter_name"
          ></el-option>
        </el-select>
      </div>
      <div class="ques_row flex-row">
        <label>分值:</label>
        <el-input placeholder="请输入分值" v-model="score" clearable></el-input>
      </div>
      <div class="ques_row flex-row">
        <label>难度:</label>
        <el-slider v-model="level" show-input> </el-slider>
      </div>
      <div class="ques_row flex-row">
        <label>区分度:</label>
        <el-slider v-model="diff" show-input> </el-slider>
      </div>
      <div class="ques_row flex-row">
        <label>重要性:</label>
        <el-select v-model="importance">
          <el-option
            v-for="item in importances"
            :key="item.index"
            :value="item.index"
            :label="item.value"
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
import ExamAPI from "@/service/TeacherExam";
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["userInfo", "subId"]),
  },
  data() {
    return {
      question: "",
      correctAnswer: "",
      tag: "",
      score: 0,
      level: 0,
      diff: 0,
      importance: 0,
      chapters: [],
      importances: [
        {
          value: "了解",
          index: 0,
        },
        {
          value: "理解",
          index: 1,
        },
        {
          value: "掌握",
          index: 2,
        },
      ],
    };
  },
  created() {
    this.getPoint();
  },
  methods: {
    s(item) {
      console.log(item);
    },
    submitAdd() {
      ExamAPI.teacherSaveQuestion({
        content: this.question,
        exam_id: this.examId,
        question_id: this.questionId,
        answer: this.correctAnswer,
        hard: this.level / 100,
        diff: this.diff / 100,
        importance: this.importance,
        score: this.score,
        kind: 2,
        user_id: this.userInfo.user_id,
      })
        .then((res) => {
          console.log(res);
          this.questionId = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPoint() {
      ExamAPI.getKonwPonit({
        sub_id: this.subId,
      })
        .then((res) => {
          console.log(res);
          this.chapters = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteQues() {
      this.question = "";
      this.correctAnswer = "";
      this.tag = "";
      this.score = 0;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../style/common.less";
#setDiscuss {
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
      /deep/ .el-slider {
        width: 50%;
      }
    }
  }
}
</style>
