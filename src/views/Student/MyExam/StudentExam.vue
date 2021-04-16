<template>
  <div id="studentExam" class="flex-col">
    <label class="res_time">
      剩余时间： {{ day }}天{{ hour }}时{{ min }}:{{ second }}
    </label>
    <div class="box_main flex-row">
      <!-- 左边的标题list -->
      <el-card class="menu_card">
        <div class="select_list" v-show="selectCount.length !== 0">
          <label class="select_type" @click="questionType = 'single'"
            >选择题</label
          >
          <div class="question_list">
            <div
              class="question_item"
              v-for="(item, index) in selectCount"
              :key="index"
              :class="{ active: selectCount[index].answer }"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
        <div class="judge_list" v-show="judgeCount.length !== 0">
          <label class="select_type" @click="questionType = 'judge'"
            >判断题</label
          >
          <div class="question_list">
            <div
              class="question_item"
              v-for="(item, index) in judgeCount"
              :key="index"
              :class="{ active: judgeCount[index].answer }"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
        <div class="discussion_list" v-show="discussionCount.length !== 0">
          <label class="select_type" @click="questionType = 'discussion'"
            >问答题</label
          >
          <div class="question_list">
            <div
              class="question_item"
              v-for="(item, index) in discussionCount"
              :key="index"
              :class="{ active: discussionCount[index].answer }"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
        <div class="program_list" v-show="programCount.length !== 0">
          <label class="select_type" @click="questionType = 'program'"
            >编程题</label
          >
          <div class="question_list">
            <div
              class="question_item"
              v-for="(item, index) in programCount"
              :key="index"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </el-card>
      <!-- 右边的题目显示 -->
      <div class="question_box">
        <single-question
          :singleQuestionList="singleList"
          @getInfo="getAnswerList"
          v-if="questionType === 'single'"
        ></single-question>
        <judge-question
          :judgeQuestionList="judgeList"
          @getInfo="getAnswerList"
          v-if="questionType === 'judge'"
        ></judge-question>
        <discussion-question
          :discussionQuestionList="discussionList"
          @getInfo="getAnswerList"
          v-if="questionType === 'discussion'"
        ></discussion-question>
        <program-question
          :programQuestionList="programList"
          v-if="questionType === 'program'"
        ></program-question>
      </div>
      <!-- <div class="button_card">
          <button @click="SubmitExam()">交卷</button>
        </div> -->
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import SingleQuestion from "./Component/SingleQuestion.vue";
import JudgeQuestion from "./Component/JudgeQuestion.vue";
import DiscussionQuestion from "./Component/DiscussionQuestion";
import ProgramQuestion from "./Component/ProgramQuestion.vue";
import QuestionAPI from "@/service/StudentExam";

export default {
  components: {
    SingleQuestion,
    JudgeQuestion,
    DiscussionQuestion,
    ProgramQuestion,
  },
  computed: {
    // ...mapState(['uid']),
    // ...mapState(['examId']),
  },
  data() {
    return {
      questionType: "single",
      path: "ws://121.36.18.182:7788/api/ws/asset",
      ws: {},
      // 存放题目id和答案，并对已作答的题目进行区分显示
      selectCount: [],
      judgeCount: [],
      discussionCount: [],
      programCount: [],
      // 存放各类题目
      singleList: [],
      judgeList: [],
      discussionList: [],
      programList: [],
      // isShowS: false,
      // isShowJ: false,
      // isShowD: false,
      // isShowP: false,
      // answerList: [],
      res_time: 0,
      curStartTime: "2020-03-17 20:30:00",
      day: "0",
      hour: "00",
      min: "00",
      second: "00",
    };
  },
  created() {
    this.init();
    this.getQuestion();
  },
  beforeDestroy() {
    this.close();
  },
  methods: {
    // websocket
    init() {
      this.ws = new WebSocket(this.path);
      this.ws.onopen = () => {
        console.log('状态：' + this.ws.readyState);
        this.sendMessage();
        this.ws.onmessage = (e) => {
          // const da = JSON.parse(e.data);
          console.log(e);
        };
      };
    },
    sendMessage() {
      const data = {
        type:"999",
        exam_id:"123",
        user_id:"123",
      };
      this.ws.send(JSON.stringify(data));
    },
    // 关闭websocket
    close() {
      this.ws.close();
    },
    // 获取题目
    getQuestion() {
      // 请求试题的接口
      QuestionAPI.requestQuestionList({
        exam_id: 1,
        user_id: 2018110214,
      })
        .then((res) => {
          // console.log(res.data);
          // 存放各类题目
          this.singleList = res.data.Single;
          this.singleList.forEach((el) => {
            const oplist = el.options.split(";");
            el.options = oplist;
          });
          this.judgeList = res.data.Judge;
          this.discussionList = res.data.Discussion;
          this.programList = res.data.Program;
          // 存放各类题目的question_id
          this.singleList.forEach((el) => {
            this.selectCount.push({ question_id: el.question_id });
          });
          this.judgeList.forEach((el) => {
            this.judgeCount.push({ question_id: el.question_id });
          });
          this.discussionList.forEach((el) => {
            this.discussionCount.push({ question_id: el.question_id });
          });
          this.programList.forEach((el) => {
            this.programCount.push({ question_id: el.question_id });
          });
          this.getLocalStorage();
        })
        .catch((err) => {
          console.log(err);
          // this.$message.error("发生错误");
        });
    },
    // 检查webstorage
    getLocalStorage() {
      // 判断localStorage里是否存放答案，如存放则取出。(避免意外刷新页面造成数据丢失)
      if (localStorage.getExpire("singleAnswer")) {
        const data = localStorage.getExpire("singleAnswer");
        const answerList = [];
        for (let i = 0; i < this.selectCount.length; i += 1) {
          answerList.push({
            question_id: this.selectCount[i].question_id,
            answer: data.answer[i],
          });
        }
        this.selectCount = answerList; // 存放localStorage里的答案和question_id
      }
      // 同选择题
      if (localStorage.getExpire("judgeAnswer")) {
        const data = localStorage.getExpire("judgeAnswer");
        const answerList = [];
        for (let i = 0; i < this.judgeCount.length; i += 1) {
          answerList.push({
            question_id: this.judgeCount[i].question_id,
            answer: data.answer[i],
          });
        }
        this.judgeCount = answerList;
      }
      if (localStorage.getExpire("discussionAnswer")) {
        const data = localStorage.getExpire("discussionAnswer");
        const answerList = [];
        for (let i = 0; i < this.discussionCount.length; i += 1) {
          answerList.push({
            question_id: this.discussionCount[i].question_id,
            answer: data.answer[i],
          });
        }
        this.discussionCount = answerList;
      }
      if (localStorage.getExpire("programAnswer")) {
        const data = localStorage.getExpire("programAnswer");
        const answerList = [];
        for (let i = 0; i < this.programCount.length; i += 1) {
          answerList.push({
            question_id: this.programCount[i].question_id,
            answer: data.answer[i],
          });
        }
        this.programCount = answerList;
      }
    },
    // 处理子组件传来的答案,将答案和question_id存进对应的count数组里，完成实别题目是否已做
    getAnswerList(data) {
      let len = 0;
      let answerList = [];
      switch (data.type) {
        case "single":
          len = this.selectCount.length;
          for (let i = 0; i < len; i += 1) {
            answerList.push({
              question_id: this.selectCount[i].question_id,
              answer: data.answer[i],
            });
          }
          this.selectCount = answerList;
          break;
        case "judge":
          len = this.judgeCount.length;
          for (let i = 0; i < len; i += 1) {
            answerList.push({
              question_id: this.judgeCount[i].question_id,
              answer: data.answer[i],
            });
          }
          this.judgeCount = answerList;
          break;
        case "discussion":
          len = this.discussionCount.length;
          for (let i = 0; i < len; i += 1) {
            answerList.push({
              question_id: this.discussionCount[i].question_id,
              answer: data.answer[i],
            });
          }
          this.discussionCount = answerList;
          break;
        case "program":
          len = this.programCount.length;
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/common.less";
#studentExam {
  padding: 20px;
  .res_time {
    position: fixed;
    font-weight: bold;
    color: @primaryText;
  }
  .box_main {
    margin-top: 40px;
    .menu_card {
      width: 240px;
      height: 60%;
      position: fixed;
      background-color: @lighterBackground;
      overflow: scroll;
      // .menu_box {
      //     overflow-y: scroll;
      //     height: 100%;
      // }
      .select_type {
        color: @correlateColor2;
        font-weight: bold;
        cursor: pointer;
      }
      .question_list {
        margin: 15px 0;
        display: flex;
        flex-wrap: wrap;
        .question_item {
          margin: 4px;
          align-items: center;
          justify-content: center;
          height: 30px;
          width: 30px;
          min-width: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: @smallBorderRadius;
          border: 1px solid @primaryColor;
          cursor: pointer;
        }
        .active {
          background-color: @correlateColor3;
          color: white;
        }
      }
    }
    .menu_card::-webkit-scrollbar {
      display: none;
    }
    .question_box {
      margin-left: 300px;
      width: 100%;
    }
  }
}
</style>
