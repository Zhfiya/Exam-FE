<template>
  <div id="examCard">
    <div
      v-for="item in examInfo"
      :key="item.exam_id"
      @click="locateTo(item)"
      class="exam_box"
    >
      <div class="info_row flex-row">
        <p class="title">{{ item.name }}</p>
        <p class="time">2020-04-28</p>
      </div>
      <div class="info_row flex-row">
        <p class="min">学科：</p>
      </div>
      <div class="info_row flex_row">
        <p class="min">状态：</p>
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
          <p>aa</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">任课老师：</p>
          <p>as</p>
        </div>
        <div class="info_row flex-row">
          <p class="before">状态：</p>
          <p>正在进行</p>
          <el-button type="success" @click="toExam">进入考试</el-button>
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
      console.log(item);
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
    .info_row {
      justify-content: space-between;
      margin-bottom: 5px;
      .title {
        // font-weight: bold;
        color: @primaryText;
      }
      .time {
        color: @primaryText;
      }
      .min {
        font-size: 14px;
        color: @secondaryText;
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
