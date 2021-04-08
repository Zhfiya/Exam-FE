<template>
  <div id="singleQuestion" class="flex-col">
    <el-card class="single_card">
      <label class="question_type">选择题</label>
      <div
        class="question_box flex-col"
        v-for="(item,index) in this.singleQuestionList"
        :key="item.question"
      >
        <div class="single_row">
          <label class="index">1.</label>
          <label class="timu">{{ item.question }}</label>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer[index]" label="A" class="op_row">
            A：{{ item.options[0] }}
          </el-radio>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer[index]" label="B" class="op_row">
            B：{{ item.options[1] }}
          </el-radio>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer[index]" label="C" class="op_row">
            C：{{ item.options[2] }}
          </el-radio>
        </div>
        <div class="single_row op_row">
          <el-radio v-model="answer[index]" label="D" class="op_row">
            D：{{ item.options[3] }}
          </el-radio>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "singleQues",
  props: {
    singleQuestionList: {
      required: false,
    },
  },
  data() {
    return {
      answer: [],
      info: {},
    };
  },
  beforecreated() {
    this.Question();
  },
  watch: {
    answer(val) {
      this.info = {
        answer: val,
        type: 'single',
      };
      this.$emit("getInfo", this.info); // 学生答题时，实时向父组件传值（父组件统一提交所有答案）
    },
  },
  methods: {
    Question() {
      // 处理获取到的选项
      this.singleQuestionList.forEach((el) => {
        const oplist = el.options.split(";");
        el.options = oplist;
        // console.log(this.singleQuestionList);
      });
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
          word-break: break-all;
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
        word-break: break-all;
      }
    }
  }
}
</style>
