<template>
  <div id="setQuestion">
    <el-tabs type="border-card">
      <el-tab-pane label="选择题">
        <div class="flex-col">
          <div class="ques_num flex-row">
            <label>题量：</label>
            <el-input v-model="singleNum" size="small"></el-input>
          </div>
          <div
            v-for="item in singleList"
            :key="item.index"
            class="ques_box flex-col"
          >
            <label class="type">选择题-{{ item.index }}</label>
            <set-single :examId="examId"></set-single>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="判断题">
        <div class="flex-col">
          <div class="ques_num flex-row">
            <label>题量：</label>
            <el-input v-model="judgeNum" size="small"></el-input>
          </div>
          <div
            v-for="item in judgeList"
            :key="item.index"
            class="ques_box flex-col"
          >
            <label class="type">判断题-{{ item.index }}</label>
            <set-judge :examId="examId"></set-judge>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="简答题">
        <div class="flex-col">
          <div class="ques_num flex-row">
            <label>题量：</label>
            <el-input v-model="discussNum" size="small"></el-input>
          </div>
          <div
            v-for="item in discussList"
            :key="item.index"
            class="ques_box flex-col"
          >
            <label class="type">简答题-{{ item.index }}</label>
            <set-discuss :examId="examId"></set-discuss>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="编程题">
        <div class="flex-col">
          <div class="ques_num flex-row">
            <label>题量：</label>
            <el-input v-model="programNum" size="small"></el-input>
          </div>
          <div
            v-for="item in programList"
            :key="item.index"
            class="ques_box flex-col"
          >
            <label class="type">编程题-{{ item.index }}</label>
            <set-program :examId="examId"></set-program>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="flex-row">
      <el-button type="danger" @click="goTo">结束出题</el-button>
    </div>
  </div>
</template>

<script>
import SetSingle from "./Component/SetSingle";
import SetJudge from "./Component/SetJudge";
import SetDiscuss from "./Component/SetDiscuss";
import SetProgram from "./Component/SetProgram";
export default {
  components: {
    SetSingle,
    SetJudge,
    SetDiscuss,
    SetProgram,
  },
  watch: {
    singleNum(val) {
      if (val) {
        this.singleList = [];
        this.singleNum = Number(val);
        let i = 0;
        for (i = 0; i < val; i++) {
          this.singleList.push({ index: i + 1 });
        }
      }
    },
    judgeNum(val) {
      if (val) {
        this.judgeList = [];
        this.judgeNum = Number(val);
        let i = 0;
        for (i = 0; i < val; i++) {
          this.judgeList.push({ index: i + 1 });
        }
      }
    },
    discussNum(val) {
      if (val) {
        this.discussList = [];
        this.discussNum = Number(val);
        let i = 0;
        for (i = 0; i < val; i++) {
          this.discussList.push({ index: i + 1 });
        }
      }
    },
    programNum(val) {
      if (val) {
        this.programList = [];
        this.programNum = Number(val);
        let i = 0;
        for (i = 0; i < val; i++) {
          this.programList.push({ index: i + 1 });
        }
      }
    },
  },
  data() {
    return {
      singleNum: 0,
      singleList: [],
      judgeNum: 0,
      judgeList: [],
      discussNum: 0,
      discussList: [],
      programNum: 0,
      programList: [],
      examId: 0,
    };
  },
  created() {
    this.examId = this.$route.query.id;
  },
  methods: {
    goTo() {
      this.$router.push("/index-teacher");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/common.less";
#setQuestion {
  .ques_num {
    color: @primaryText;
    label {
      width: 50px;
      line-height: 32px;
      text-align: left;
    }
    /deep/ .el-input {
      width: 100px;
    }
  }
  .ques_box {
    margin-top: 20px;
    color: @regularText;
    .type {
      font-weight: bold;
    }
  }
  /deep/ .el-button {
    margin: 20px 0;
    padding: 10px;
  }
}
</style>
