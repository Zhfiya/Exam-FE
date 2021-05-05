<template>
  <div id="courseCard" class="flex-col" v-if="update">
    <div class="flex-row title">
      <img src="@/assets/Teacher/indexCourse.png" alt="" />
      <p>{{ examDetail.exam_name }}</p>
    </div>
    <div class="flex-row">
      <img src="@/assets/Teacher/indexTime.png" alt="" />
      <p>考试时间：</p>
      <p>{{ examDetail.begin_time }}</p>
    </div>
    <div class="flex-row">
      <img src="@/assets/Teacher/indexTime.png" alt="" />
      <p>考试时长：</p>
      <p>{{ lastTime }} min</p>
    </div>
    <div class="flex-row status_row">
      <img src="@/assets/Teacher/indexStatus.png" alt="" />
      <p>考试状态：</p>
      <p>{{ examDetail.exam_status }}</p>
      <el-button
        class="info_button"
        size="small"
        type="info"
        plain
        @click="getAction(examDetail)"
        >{{ statusAction }}</el-button
      >
    </div>
    <el-dialog title="修改时间" :visible.sync="dialog" width="30%" center>
      <div class="flex-col">
        <div class="flex-row info_row">
          <p>原时长：</p>
          <p>{{ selectExamTime }} min</p>
        </div>
        <div class="info_row flex-row">
          <p>新时长：</p>
          <el-input v-model="newTime">
            <template slot="append">min</template>
          </el-input>
        </div>
        <div class="info_row flex-row">
          <p>终止考试：</p>
          <el-button type="danger" plain @click="confirmEnd"
            >终止考试</el-button
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="changeTime" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ExamAPI from "@/service/TeacherExam";
import { mapState } from "vuex";
export default {
  props: {
    examDetail: {
      required: true,
    },
  },
  computed: {
    ...mapState(["subId", "userInfo"]),
  },
  data() {
    return {
      update: true,
      statusAction: "",
      dialog: false,
      selectExamTime: "0",
      selectExamid: 0,
      newTime: "",
      lastTime:'',
    };
  },
  created() {
    // console.log(this.examDetail);
    this.lastTime = this.examDetail.last_time;
    if (this.examDetail.exam_status === "正在进行") {
      this.statusAction = "修改时间";
    } else if (this.examDetail.exam_status === "未开始") {
      this.statusAction = "修改试卷";
    } else if (this.examDetail.exam_status === "未评分") {
      this.statusAction = "阅卷";
    } else if (this.examDetail.exam_status === "已评分") {
      this.statusAction = "查看成绩";
    }
  },
  methods: {
    getAction(exam) {
      this.selectExamid = exam.exam_id;
      if (exam.exam_status === "正在进行") {
        // this.statusAction = "修改时间";
        this.selectExamTime = exam.last_time;
        this.dialog = true;
      } else if (exam.exam_status === "未开始") {
        // this.statusAction = "修改试卷";
        this.$router.push({
          path: `/teacher-set-question?id=${this.selectExamid}`,
        });
      } else if (exam.exam_status === "未评分") {
        this.$router.push({
          path: `/teacher-mark-paper?id=${this.selectExamid}`,
        });
      } else if (exam.exam_status === "已评分") {
        this.statusAction = "查看成绩";
      }
    },
    changeTime() {
      ExamAPI.teacherUpdateExamTime({
        user_id: this.userInfo.user_id,
        exam_id: this.examDetail.exam_id,
        last_time: this.newTime,
      })
        .then((res) => {
          if (res.code == 200) {
            this.dialog = false;
            this.lastTime = this.newTime;
            this.update = false;
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            this.$nextTick(() => {
              this.update = true;
            });
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 终止考试
    confirmEnd() {
      this.$confirm("此操作将终止考试, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.endExam();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    endExam() {
      ExamAPI.teacherEndExam({
        user_id: this.userInfo.user_id,
        exam_id: this.selectExamid,
      })
        .then((res) => {
          if (res.code === 200) {
            this.dialog = false;
            this.update = false;
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            this.$nextTick(() => {
              this.update = true;
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

<style lang="less" scoped>
@import url("../../../style/common.less");
#courseCard {
  // border: 1px solid;
  color: @regularText;
  font-size: 13px;
  padding: 10px;
  background-color: @white;
  margin-bottom: 20px;
  .title {
    font-weight: bold;
  }
  .status_row {
    line-height: 34px;
    img {
      margin-top: 7px;
    }
  }
  .info_button {
    margin-left: 20px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  /deep/ .el-dialog {
    .info_row {
      margin-bottom: 20px;
    }
    p {
      width: 70px;
      line-height: 40px;
    }
    .el-input {
      width: 90%;
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
