<template>
  <div id="programQuestion">
    <el-card class="single_card">
      <label class="question_type">编程题</label>
      <div
        class="question_box"
        v-for="item in this.programQuestionList"
        :key="item.question"
      >
        <div class="single_row">
          <label class="index">1.</label>
          <label class="timu">{{ item.question }}</label>
        </div>
        <div class="single_row">
          <div class="example flex-col">
            <p>样例输入</p>
            <label class="example_real">{{ stdinput }}</label>
            <p>样例输出</p>
            <label class="example_real">{{ stdoutput }}</label>
          </div>
        </div>
        <div class="single_row">
          <label class="tip">提示：{{ item.tip }}</label>
        </div>
        <div class="single_row">
          <label class="ques_label">语言：</label>
          <el-select v-model="language" size="small" class="selt">
            <el-option
              v-for="item in lis"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="single_row">
          <!-- <el-input type="textarea" v-model="code" :rows="6"> -->
          <codemirror
            v-model="code"
            :options="Options"
            class="code"
          ></codemirror>
          <!-- </el-input> -->
        </div>
        <div class="button_row">
          <button @click="submit()"><i class="el-icon-edit"></i>submit</button>
        </div>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      title="提交结果"
      width="1100px"
      customClass="diatable"
    >
      <div>
        <el-table style="width: 100%" :data="statusList">
          <el-table-column
            property="date"
            label="提交时间"
            width="180"
          ></el-table-column>
          <el-table-column
            property="status"
            label="状态"
            width="170"
          ></el-table-column>
          <el-table-column
            property="score"
            label="分数"
            width="150"
          ></el-table-column>
          <el-table-column
            property="language"
            label="语言"
            width="180"
          ></el-table-column>
          <el-table-column
            property="username"
            label="用户"
            width="180"
          ></el-table-column>
          <el-table-column
            property="num"
            label="题目"
            width="170"
          ></el-table-column>
        </el-table>
        <el-table :data="testList" style="width: 100%" stripe>
          <el-table-column
            property="number"
            label="测试点"
            width="250"
          ></el-table-column>
          <el-table-column
            property="result"
            label="结果"
            width="250"
          ></el-table-column>
          <el-table-column
            property="runtime"
            label="耗时"
            width="250"
          ></el-table-column>
          <el-table-column
            property="memory"
            label="内存"
            width="250"
          ></el-table-column>
        </el-table>
      </div>
      <div style="margin: 20px 0">
        <label>代码</label>
        <el-input
          type="textarea"
          v-model="code"
          :disabled="true"
          :rows="6"
        ></el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import JudgeAPI from "@/service/StudentExam";
import { codemirror } from "vue-codemirror";

require("codemirror/addon/edit/matchbrackets.js");
require("codemirror/mode/python/python.js");
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/fold/brace-fold.js");
require("codemirror/addon/fold/xml-fold.js");
require("codemirror/addon/fold/indent-fold.js");
require("codemirror/addon/fold/markdown-fold.js");
require("codemirror/addon/fold/comment-fold.js");

export default {
  name: "progarmQues",
  props: {
    // 父组件传值，index：下标，ProgramQ：编程题，examId：考试id
    programQuestionList: {
      require: false,
    },
  },
  components: {
    codemirror,
  },
  data() {
    return {
      answer: "",
      status: "",
      timu: "",
      stdinput: [],
      stdoutput: [],
      code: "",
      tip: "",
      score: 0,
      language: "",
      lis: [
        {
          value: "C",
        },
        {
          value: "C++",
        },
        {
          value: "Python2",
        },
        {
          value: "Python3",
        },
        {
          value: "Java",
        },
      ],

      dialogVisible: false,
      statusList: [],
      testList: [],
      type: "",
      Options: {
        tabSize: 4,
        mode: "python",
        lineWrapping: true,
        lineNumbers: true,
        extraKeys: { Ctrl: "autocomplete" },
        matchBrackets: true,
        line: true,
      },
    };
  },
  created() {
    this.Question();
    console.log(this.programQuestionList);
  },
  watch: {
    dialogVisible(val) {
      // 实时判断运行后的弹框是否关闭，关闭将编译状态等置空
      if (val === false) {
        this.testList = [];
        this.statusList = [];
      }
    },
    // code(val) {
    //   this.info = {
    //     question_id: this.ProgramQ.question_id,
    //     answer: val,
    //     score: this.score,
    //     type: this.type,
    //     num: this.index + 1,
    //   };
    //   // console.log(this.info);
    //   this.$emit("func", this.info); // 学生答题时，实时向父组件传值（父组件统一提交所有答案）
    // },
  },
  methods: {
    Question() {
      // 渲染获取到的题目
      if (this.programQuestionList.input === null) {
        this.stdinput = "无";
      } else {
        this.stdinput = this.programQuestionList.input;
      }
      this.stdoutput = this.programQuestionList.output;
    },
    getTime() {
      // 时间戳转换时间
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}/${month}/${day}/  ${hours}:${minutes}:${seconds}`;
    },
    async submit() {
      // 运行编程题
      // console.log(this.code);
      JudgeAPI.judgeProgram({
        exam_id: 1,
        user_id: 2018110214,
        question_id: 270,
        language: this.language,
        code: this.code,
      })
        .then((res) => {
          if (res.code === 200) {
            const info = res.data;
            // console.log(info.compile_error);
            if (info.compile_error === true) {
              this.$message({
                type: "error",
                message: "编译错误",
                offset: 70,
              });
            } else {
              // 编译成功后的数据渲染
              this.score = info.score;
              // console.log(info);
              this.statusList.push({
                date: this.getTime(),
                status: info.status,
                score: this.score,
                language: info.language,
                username: info.username,
                num: info.num,
              }); // 状态数据渲染
              const testCase = info.test_case_res; // 测试样例数据渲染
              testCase.forEach((item) => {
                this.testList.push({
                  number: item.case_num,
                  result: item.result,
                  runtime: item.run_time,
                  memory: item.memory,
                });
              });
              this.dialogVisible = true; // 渲染弹框
            }
          } else {
            // 报错提醒
            this.$message({
              type: "error",
              message: res.data.message,
              offset: 70,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
@import "../../../../style/common.less";
#programQuestion {
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
        .example {
          p {
            text-align: left;
            font-weight: bold;
            padding: 10px 0;
          }
          .example_real {
            padding: 10px;
            background-color: @background;
          }
        }
        .tip {
          word-wrap: break-word;
          word-break: break-all;
          text-align: left;
          color: @warningColor;
        }
      }
    }
  }

  .code {
    width: 100%;
    text-align: left;
    font-weight: bold;
  }
  .button_row {
    display: flex;
    justify-content: flex-end;
    button {
      color: white;
      margin: 10px 0;
      border: none;
      border-radius: 2px;
      padding: 5px 10px;
      width: 80px;
      font-size: 15px;
      background-color: #5379a5c4;
      cursor: pointer;
      outline: none;
      display: flex;
      flex-direction: center;
    }
    button:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
  }
  .diatable {
    text-align: left;
  }
}
</style>
