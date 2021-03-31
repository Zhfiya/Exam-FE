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
            <label>选择题-{{ item.index }}</label>
            <set-single :index="item.index"></set-single>
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
            <label>判断题-{{ item.index }}</label>
            <set-judge :index="item.index"></set-judge>
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
            <label>简答题-{{ item.index }}</label>
            <set-discuss :index="item.index"></set-discuss>
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
            <label>编程题-{{ item.index }}</label>
            <set-program :index="item.index"></set-program>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      if (Number(val) !== 0) {
        this.singleList = [];
        this.singleNum = Number(val);
        let i = 0;
        for (i = 0; i < val; i++) {
          this.singleList.push({ index: i + 1 });
        }
      }
    },
    judgeNum(val) {
      if (Number(val) !== 0) {
        this.judgeList = [];
        this.judgeNum = Number(val);
        let i = 0;
        for (i = 0; i < val; i++) {
          this.judgeList.push({ index: i + 1 });
        }
      }
    },
    discussNum(val) {
      if (Number(val) !== 0) {
        this.discussList = [];
        this.discussNum = Number(val);
        let i = 0;
        for (i = 0; i < val; i++) {
          this.discussList.push({ index: i + 1 });
        }
      }
    },
    programNum(val) {
      if (Number(val) !== 0) {
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
    };
  },
  created() {},
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
  }
}
</style>
