<template>
  <div id="examList">
    <label>我的考试</label>
    <div class="list_box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <exam-card :examInfo="examAll"></exam-card>
        </el-tab-pane>
        <el-tab-pane label="未开始" name="none">
          <exam-card :examInfo="examNone"></exam-card>
        </el-tab-pane>
        <el-tab-pane label="正在进行" name="ing">
          <exam-card :examInfo="examIng"></exam-card>
        </el-tab-pane>
        <el-tab-pane label="已结束" name="end">
          <exam-card :examInfo="examEnd"></exam-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ExamCard from "./Component/ExamCard";
import ExamAPI from "@/service/StudentExam";
export default {
  components: {
    ExamCard,
  },
  data() {
    return {
      activeName: "all",
      examAll: [
        // {
        //   exam_id: 1,
        //   name: "第一次考试",
        //   begin_time: "2021-04-19 8:00",
        //   last_time: "120min",
        //   subject: "数据结构",
        //   status: "正在进行中",
        // },
        // {
        //   exam_id: 2,
        //   name: "第二次考试",
        //   begin_time: "2021-04-19 8:00",
        //   last_time: "120min",
        //   subject: "数据结构",
        //   status: "已评分",
        //   score: "98",
        // },
      ],
      examNone: [],
      examIng: [],
      examEnd: [],
    };
  },
  created() {
    this.getExamList();
  },
  methods: {
    // 选择展现的状态
    handleClick(tab) {
      console.log(tab.name);
    },
    // 获取考试list,归类并处理状态
    getExamList() {
      ExamAPI.requestExamList({
        user_id: "2018110214",
      })
        .then((res) => {
          // console.log(res.data);
          res.data.forEach((element) => {
            element.begin_time = this.getTime(element.begin_time);
            if (element.exam_status === 0) {
              element.exam_status = "未开始";
              this.examNone.push(element);
            } else if (element.exam_status === 1) {
              element.exam_status = "正在进行";
              this.examIng.push(element);
            } else if (element.exam_status === 2) {
              element.exam_status = "未评分";
              this.examEnd.push(element);
            } else if (element.exam_status === 3) {
              element.exam_status = "已评分";
              this.examEnd.push(element);
            }
            this.examAll.push(element);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTime(oldDate) {
      // 时间戳转换时间
      const date = new Date(oldDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../style/common.less");
#examList {
  height: 600px;
  label {
    margin-left: 100px;
    padding: 10px;
    background-color: @correlateColor2;
    font-weight: bold;
    color: @white;
    border-radius: @smallBorderRadius;
  }
  .list_box {
    margin-top: 20px;
    padding: 0 100px;
    /deep/ .el-tabs__nav-scroll {
      background-color: @background;
      padding: 5px 10px;
      border-radius: @smallBorderRadius;
    }
    /deep/ .el-tabs__item.is-active {
      color: @correlateColor2;
    }
    /deep/ .el-tabs__active-bar {
      background-color: @correlateColor2;
    }
  }
}
</style>
