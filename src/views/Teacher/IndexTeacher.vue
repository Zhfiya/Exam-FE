<template>
  <div id="indexTeacher">
    <div class="top_row flex-row">
      <label class="title">我管理的</label>
      <el-button>添加课程</el-button>
    </div>
    <div class="course_box">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="item in courseList"
          :key="item.course_id"
          :title="item.name"
          :name="item.name"
          class="flex-col"
        >
          <div class="flex-row detail_row">
            <div class="flex-row">
              <p class="detail">课程代码：{{ courseCode }}</p>
              <p class="detail">课程人数：{{ studentNum }}</p>
            </div>
            <el-button @click="addExam(item.course_id)" type="primary" plain
              >添加考试</el-button
            >
          </div>
          <div v-for="it in item.examList" :key="it.exam_id">
            <course-card :examDetail="it"></course-card>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- <p class="a">sss</p> -->
    </div>
    <el-dialog title="添加考试" :visible.sync="addDialog" width="30%" center>
      <div class="flex-col">
        <div class="info_row flex-row">
          <p>考试名称：</p>
          <el-input v-model="addExamName"></el-input>
        </div>
        <div class="info_row flex-row">
          <p>开始时间：</p>
          <el-date-picker
            v-model="addBeginTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择日期时间"
          ></el-date-picker>
        </div>
        <div class="info_row flex-row">
          <p>持续时间</p>
          <el-input v-model="addLastTime">
            <template slot="append">min</template>
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="addDialog = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitAdd" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CourseCard from "./Component/CourseCard";
import addExamAPI from "@/service/TeacherExam";
export default {
  components: {
    CourseCard,
  },
  data() {
    return {
      activeName: "1",
      courseCode: "BKFRUV",
      studentNum: 13,
      addExamName: "",
      addBeginTime: "",
      addLastTime: "",
      courseList: [
        {
          course_id: 1,
          name: "数据库",
          examList: [
            {
              exam_id: 1,
              name: "第一次考试",
              status: "未改卷",
              time: "2020-04-19",
              studentNum: 59,
            },
            {
              exam_id: 2,
              name: "第二次考试",
              status: "考试进行中",
              time: "2020-04-19",
              studentNum: 59,
            },
          ],
        },
        {
          course_id: 2,
          name: "java",
        },
        {
          course_id: 3,
          name: "计算机网络",
        },
      ],
      addDialog: false,
    };
  },
  methods: {
    addExam() {
      this.addDialog = true;
    },
    submitAdd() {
      addExamAPI
        .teacherAddExam({
          user_id: "a",
          sub_id: "ABCDEF",
          exam_name: this.addExamName,
          begin_time: this.addBeginTime,
          last_time: this.addLastTime,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/teacher-set-question");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../style/common.less");
#indexTeacher {
  .top_row {
    justify-content: space-between;
    .el-button {
      padding: 10px;
    }
  }
  padding: 0 5%;
  background-color: @lighterBackground;
  .title {
    padding: 10px;
    background-color: @tcorrelateColor1;
    color: @primaryText;
  }
  .course_box {
    margin-top: 20px;
    color: @regularText;
    height: 600px;
    overflow-y: scroll;
    .a {
      height: 1000px;
    }
    .detail {
      margin-bottom: 10px;
      margin-right: 10px;
      color: @regularText;
    }
    /deep/ .el-collapse-item__header {
      font-size: 16px;
      padding: 0 10px;
      color: @primaryText;
      border-radius: 2px;
      background-color: @background;
    }
    /deep/ .el-collapse-item__content {
      font-size: 14px;
      padding: 20px;
      background: @lighterBackground;
      .detail_row {
        justify-content: space-between;
      }
      .el-button {
        padding: 10px;
      }
    }
  }
  .add_row {
    margin-top: 50px;
  }
  /deep/ .el-dialog {
    .info_row {
      margin-bottom: 10px;
    }
    p {
      width: 100px;
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
  .course_box::-webkit-scrollbar {
    display: none;
  }
}
</style>
