<template>
  <div id="markPaper" class="flex-col">
    <div class="head">
      <el-card>
        <label class="tip">
          尊敬的老师您好！
          <br />这里是问答题评分中心，左侧是参与本次考试所有学生的学号和姓名，请点击您想评分的学生进行评分，
          评分结束后记得及时提交，祝您阅卷愉快~
          <p @click="markAll">全部评完点击这里</p>
        </label>
      </el-card>
    </div>
    <div class="center flex-row">
      <div class="left flex-col">
        <el-card>
          <div class="stu_list flex-col">
            <label
              v-for="(item, index) in stuList"
              :key="item.id"
              class="stu_label"
              :class="{ active: item.active }"
              @click="showStuQues(index)"
              >{{ item.id }} - {{ item.name }}</label
            >
          </div>
        </el-card>
      </div>
      <div class="right">
        <el-card>
          <div class="row">
            <label class="ing">考生：</label>
            <label class="answer ing"
              >{{ this.id }} -- {{ this.stuName }}</label
            >
          </div>
          <div class="ques_list">
            <div
              class="ques_card flex-col"
              v-for="(item, index) in List"
              :key="index"
            >
              <el-card>
                <div class="row">
                  <label>题目：</label>
                  <label class="answer">{{ item.ques }}</label>
                </div>
                <div class="row">
                  <label>学生答案：</label>
                  <label class="answer">{{ item.stuanswer }}</label>
                </div>
                <div class="row std">
                  <label>参考答案：</label>
                  <label class="answer">{{ item.answer }}</label>
                </div>
                <div class="row">
                  <label>满分：</label>
                  <label class="answer">{{ item.score }}</label>
                </div>
                <div class="row">
                  <label>学生得分：</label>
                  <el-input size="small" v-model="score[index]"></el-input>
                </div>
              </el-card>
            </div>
          </div>
        </el-card>
        <button @click="SubmitScore()">提交</button>
        <button @click="GoBack()" class="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import MarkAPI from "@/service/TeacherMarkPaper";

export default {
  name: "scoreCenter",
  created() {
    // this.getQues();
    // console.log(this.examId);
    this.getStudent();
  },
  computed: {
    // ...mapState(['examId']),
  },
  data() {
    return {
      stuList: [],
      stuAnswer: [],
      List: [],
      score: [],
      id: "",
      stuName: "",
      quesList: [],
      index: 0,
      timer: "",
    };
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    getStudent() {
      MarkAPI.requestStudentAnswer({
        exam_id: this.$route.query.id,
      })
        .then((res) => {
          if (res.code === 200) {
            const info = res.data;
            this.stuAnswer = info.stuInfo;
            const ques = info.question;
            ques.forEach((item) => {
              this.List.push({
                ques: item.question,
                answer: item.answer,
                score: item.score,
                stuanswer: "",
              });
              this.quesList.push(item.question_id);
            });
            this.stuAnswer.forEach((item) => {
              this.stuList.push({
                id: item.id,
                name: item.name,
                active: false,
              });
            });
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showStuQues(index) {
      this.score = [];
      this.index = index;
      this.id = this.stuAnswer[index].id;
      this.stuName = this.stuAnswer[index].name;
      const stuques = this.stuAnswer[index].question;
      for (let i = 0; i < this.List.length; i += 1) {
        this.List[i].stuanswer = stuques[i].answer;
      }
      const data = JSON.parse(sessionStorage.getItem(this.id));
      if (data) {
        this.score = data;
      }
    },
    GoBack() {
      this.$router.go(-1);
    },
    markAll() {
      MarkAPI.markAllPaper({
        exam_id: this.$route.query.id,
      })
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$router.push("/index-teacher");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    SubmitScore() {
      let isOk = false;
      for (let i = 0; i < this.score.length; i += 1) {
        if (this.score[i] > this.List[i].score) {
          isOk = false;
        } else {
          isOk = true;
        }
      }
      if (this.score.length < this.List.length) {
        this.$alert("您还有题目没有进行打分", "提示", {
          confirmButtonText: "确定",
        });
      }
      if (isOk) {
        sessionStorage.setItem(this.id, JSON.stringify(this.score));
        this.HandIn();
      } else {
        this.$message({
          message: "学生得分大于满分",
          type: "error",
          offset: 70,
        });
      }
    },
    HandIn() {
      const scoreList = [];
      for (let i = 0; i < this.score.length; i += 1) {
        const score = parseInt(this.score[i], 10);
        scoreList.push({
          question_id: this.quesList[i],
          score,
        });
      }
      MarkAPI.markPaper({
        exam_id: this.$route.query.id,
        stu_id: this.id,
        scoreList,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "提交成功",
              offset: 70,
            });
          }
          this.stuList[this.index].active = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../style/common.less");
#markPaper {
  width: 100%;
  height: 100%;
  .head {
    color: @primaryText;
    p {
      font-size: 12px;
      color: @dangerColor;
      cursor: pointer;
    }
  }
  .center {
    margin: 30px 0;
  }
  .left {
    width: 300px;
    .list_label {
      color: #1c3044;
      font-weight: bold;
    }
    .stu_list {
      justify-content: center;
      text-align: left;

      label {
        cursor: pointer;
      }
    }
    .stu_label {
      margin: 5px;
    }
  }
  .right {
    margin-left: 50px;
    width: 100%;
    .ques_card {
      text-align: left;
      margin-bottom: 10px;
      label {
        font-weight: bold;
        width: 100px;
        bottom: 0;
        line-height: 25px;
        margin-top: 2px;
      }
      .answer {
        font-weight: normal;
        width: 90%;
        margin-top: 3px;
        word-wrap: break-word;
      }
    }
    .row {
      display: flex;
      flex-direction: row;
      margin: 15px;
    }
    .std {
      color: @dangerColor;
    }
    .ing {
      color: @warningColor;
    }
  }
  button {
    color: white;
    margin: 20px 10px 10px 0;
    border: none;
    border-radius: 2px;
    padding: 5px 10px;
    width: 100px;
    font-size: 15px;
    background-color: @tcorrelateColor3;
    cursor: pointer;
    outline: none;
  }
  button:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
  }
  .back {
    background-color: silver;
  }
  .active {
    color: @dangerColor;
  }
}
</style>
