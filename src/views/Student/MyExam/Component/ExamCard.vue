<template>
  <div id="examCard">
    <div
      v-for="item in examInfo"
      :key="item.exam_id"
      @click="locateTo(item)"
      class="exam_box"
    >
      <div class="title_row flex-row">
        <div class="flex-row">
          <img src="@/assets/Student/examTitle.png" />
          <p>{{ item.exam_name }}</p>
        </div>
        <p>{{ item.begin_time }}</p>
      </div>
      <div class="info_row flex-row">
        <p>学科：</p>
        <p>{{ item.co_name }}</p>
      </div>
      <div class="info_row flex-row">
        <p>状态：</p>
        <p>{{ item.exam_status }}</p>
        <p v-if="item.score" class="score">{{ item.score }}分</p>
      </div>
    </div>
    <el-dialog
      :title="selectExam.name"
      :visible.sync="examDialogVisible"
      width="30%"
      center
    >
      <div class="flex-col">
        <div class="info_row flex-row">
          <p class="before">学科：</p>
          <p>{{ selectExam.co_name }}</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">任课老师：</p>
          <p>{{ selectExam.tea_name }}</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">开始时间：</p>
          <p>{{ selectExam.begin_time }}</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">考试时长：</p>
          <p>{{ selectExam.last_time }} min</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">状态：</p>
          <p>{{ selectExam.exam_status }}</p>
          <el-button type="success" @click="Action(selectExam)">{{
            statusAction
          }}</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="examDialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
    <p v-if="this.examInfo.length === 0" class="tip_null">暂无考试</p>
  </div>
</template>

<script>
export default {
  props: {
    examInfo: {
      required: false,
    },
  },
  data() {
    return {
      examDialogVisible: false,
      selectExam: [],
      statusAction: "",
    };
  },
  created() {
    console.log(this.examInfo);
  },
  methods: {
    // 考试详情
    locateTo(item) {
      this.examDialogVisible = true;
      this.selectExam = item;
      if (item.exam_status == "正在进行") {
        this.statusAction = "进入考试";
      } else if (item.exam_status === "已评分") {
        this.statusAction = "查看成绩";
      }
    },
    Action(item) {
      if (item.exam_status === "正在进行") {
        this.$router.push({ path: `/student-exam?id=${item.exam_id}` });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../../style/common.less");
#examCard {
  .exam_box {
    background-color: @lighterBackground;
    border-radius: @smallBorderRadius;
    padding: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    .title_row {
      justify-content: space-between;
      margin-bottom: 5px;
      color: @primaryText;
      font-size: 16px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
    .info_row {
      margin-bottom: 5px;
      font-size: 14px;
      color: @secondaryText;
      .score {
        margin-left: 10px;
        color: @warningColor;
        font-weight: bold;
      }
    }
  }
  .tip_null {
    color: @primaryColor;
    font-weight: bold;
    font-size: 20px;
  }
  /deep/ .el-dialog {
    .info_row {
      line-height: 30px;
      margin-bottom: 10px;
      .before {
        color: @primaryText;
        width: 100px;
      }
      .el-button {
        margin-left: 20px;
        padding: 5px 10px;
      }
    }
  }
  /deep/ .el-dialog__footer {
    .el-button {
      padding: 10px;
    }
  }
  /deep/ .el-dialog__body {
    padding: 10px 40px;
  }
}
</style>
