<template>
  <div id="studentExam" class="flex-col">
    <label class="res_time">
      剩余时间： {{ day }}天{{ hour }}时{{ min }}:{{ second }}
    </label>
    <div class="box_main flex-row">
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
              :class="{active: singleQues[index]}"
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
        v-if="questionType === 'program'"></program-question>
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
      path: "ws://localhost:7788/websocket/",
      ws: {},
      // 存放左边list的数量和id
      selectCount: [],
      judgeCount: [],
      discussionCount: [],
      programCount: [],
      // 存放各类题目
      singleList: [],
      judgeList: [],
      discussionList: [],
      programList: [],
      // 存放已经做了的题号和答案
      singleQues:[],
      judgeQues:[],
      discussQues:[],
      programQues:[],
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
  methods: {
    // websocket
    init() {
      this.ws = new WebSocket(this.path);
      this.ws.onopen = () => {
        console.log(this.ws.readyState);
      };
      this.ws.onmessage = (data) => {
        console.log(data.data);
      };
    },
    // 获取题目
    getQuestion() {
      QuestionAPI.requestQuestionList({
        exam_id: 1,
        user_id: 2018110214,
      })
        .then((res) => {
          console.log(res.data);
          // 存放各类题目
          this.singleList = res.data.Single;
          this.singleList.forEach((el) => {
            const oplist = el.options.split(";");
            el.options = oplist;
          });
          this.judgeList = res.data.Judge;
          this.discussionList = res.data.Discussion;
          this.programList = res.data.Program;
          // 存放各类count
          this.singleList.forEach((el) => {
            this.selectCount.push({ index: el.question_id });
          });
          this.judgeList.forEach((el) => {
            this.judgeCount.push({ index: el.question_id });
          });
          this.discussionList.forEach((el) => {
            this.discussionCount.push({ index: el.question_id });
          });
          this.programList.forEach((el) => {
            this.programCount.push({ index: el.question_id });
          });
        })
        .catch((err) => {
          console.log(err);
          // this.$message.error("发生错误");
        });
    },
    // 处理已经做了的题,左边的list变色
    getAnswerList(data) {
      // const type = data.type;
      // this.type = data.answer;
      const len = this.selectCount.length;
      // console.log(data.answer);
      const answerList = [];
      for(let i=0;i<len;i+=1) {
        answerList.push({question_id:this.selectCount[i].index,answer:data.answer[i]});
      }
      // console.log(answerList);
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
