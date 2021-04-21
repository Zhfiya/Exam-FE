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
          <p>{{ item.name }}</p>
        </div>
        <p>2020-04-28</p>
      </div>
      <div class="info_row flex-row">
        <p>学科：</p>
        <p>{{ item.subject }}</p>
      </div>
      <div class="info_row flex-row">
        <p>状态：</p>
        <p>{{ item.status }}</p>
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
          <p>{{ selectExam.subject }}</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">任课老师：</p>
          <p>{{ selectExam.teacher }}</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">开始时间：</p>
          <p>{{ selectExam.begin_time }}</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">考试时长：</p>
          <p>{{ selectExam.last_time }}</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">状态：</p>
          <p>{{ selectExam.status }}</p>
          <el-button type="success" @click="toExam">{{
            statusAction
          }}</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="examDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="success" @click="examDialogVisible = false" plain
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      if (item.status === "正在进行中") {
        this.statusAction = "进入考试";
      } else if (item.status === "已评分") {
        this.statusAction = "查看成绩";
      }
    },
    toExam() {
      this.$router.push("/student-exam");
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
