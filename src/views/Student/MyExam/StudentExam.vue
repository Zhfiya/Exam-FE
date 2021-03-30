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
          v-if="questionType === 'single'"
        ></single-question>
        <judge-question
          :judgeQuestionList="judgeList"
          v-if="questionType === 'judge'"
        ></judge-question>
        <discussion-question
          :discussionQuestionList="discussionList"
          v-if="questionType === 'discussion'"
        ></discussion-question>
        <program-question v-if="questionType === 'program'"></program-question>
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
      selectCount: [
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 31 },
        { index: 13 },
        { index: 32 },
        { index: 33 },
        { index: 34 },
        { index: 343 },
        { index: 342 },
      ],
      judgeCount: [
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 31 },
        { index: 13 },
        { index: 32 },
        { index: 33 },
        { index: 34 },
        { index: 343 },
        { index: 342 },
      ],
      discussionCount: [
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 31 },
        { index: 13 },
        { index: 32 },
        { index: 33 },
        { index: 34 },
        { index: 343 },
        { index: 342 },
      ],
      programCount: [
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 31 },
        { index: 13 },
        { index: 32 },
        { index: 33 },
        { index: 34 },
        { index: 343 },
        { index: 342 },
      ],
      singleList: [
        {
          optionA: "a",
          optionB: "ss",
          optionC: "dv",
          optionD: "cd",
          question: "aaaaa",
        },
      ],
      judgeList: [
        {
          question: "aaaaa",
        },
      ],
      discussionList: [
        {
          question: "aaaaa",
        },
      ],
      programList: [],
      isShowS: false,
      isShowJ: false,
      isShowD: false,
      isShowP: false,
      answerList: [],
      res_time: 0,
      curStartTime: "2020-03-17 20:30:00",
      day: "0",
      hour: "00",
      min: "00",
      second: "00",
    };
  },
  created() {},
  methods: {},
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
