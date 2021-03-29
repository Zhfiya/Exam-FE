<template>
  <div id="singleQuestion" class="flex-col">
    <el-card class="single_card">
      <label class="question_type">选择题</label>
      <div
      class="question_box flex-col"
      v-for="item in this.singleQuestionList"
      :key="item.timu">
        <div class="single_row">
            <label class="index">1.</label>
            <label class="timu">{{ item.question }}</label>
        </div>
        <div class="single_row op_row">
            <el-radio v-model="answer" label="A" class="op_row">
              A：{{ item.optionA }}
            </el-radio>
        </div>
        <div class="single_row op_row">
            <el-radio v-model="answer" label="B" class="op_row">
              B：{{ item.optionB }}
            </el-radio>
        </div>
        <div class="single_row op_row">
            <el-radio v-model="answer" label="C" class="op_row">
              C：{{ item.optionC }}
            </el-radio>
        </div>
        <div class="single_row op_row">
            <el-radio v-model="answer" label="D" class="op_row">
            D：{{ item.optionD }}
            </el-radio>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "singleQues",
    props: {// 父组件传值，index：下标，SingleQ：单选题
        // index: {
        //     type: Number,
        //   required: true,
        // },
        singleQuestionList: {
            required: false,
        },
    },
  data() {
    return {
      answer: "",
      optionA: "aasssaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      optionB: "ss",
      optionC: "dv",
      optionD: "cd",
      question: "nihszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzssssssssssssssssssssssssssssssssssssssssssssssssssdxsu",
      info: {},
    };
  },
  created() {
    // this.Question();
    console.log(this.SingleQ);
  },
  watch: {
    answer(val) {
      this.info = {
        question_id: this.SingleQ.question_id,
        answer: val,
        score: 0,
        type: "Single",
        num: this.index + 1,
      };
      this.$emit("func", this.info); // 学生答题时，实时向父组件传值（父组件统一提交所有答案）
    },
  },
  methods: {
    Question() {
      // 渲染获取到的题目和选项
    //   this.timu = this.SingleQ.timu;
    //   if (this.SingleQ.options) {
    //     const oplist = this.SingleQ.options.split(";");
    //     const a = oplist[0];
    //     const b = oplist[1];
    //     const c = oplist[2];
    //     const d = oplist[3];
    //     this.optionA = a;
    //     this.optionB = b;
    //     this.optionC = c;
    //     this.optionD = d;
    //   }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../style/common.less";
#singleQuestion {
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
                word-break:break-all;
                text-align: left;
                margin-left: 5px;
                color: @primaryText;
            }
        }
        .op_row {
            color: @regularText;
            margin-left: 10px;
            white-space: normal;
            word-wrap: break-word;
            word-break:break-all;
        }
    }
  }
}
</style>
