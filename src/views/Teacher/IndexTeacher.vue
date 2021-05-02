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
          :key="item.sub_id"
          :title="item.sub_name"
          :name="item.sub_name"
          class="flex-col"
        >
          <div class="flex-row detail_row">
            <div class="flex-row">
              <p class="detail">课程代码：{{ item.sub_id }}</p>
              <p class="detail">课程人数：{{ item.stu_num }}</p>
            </div>
            <el-button @click="addExam(item.sub_id)" type="primary" plain
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
            value-format="timestamp"
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
import CourseAPI from "@/service/TeacherSubject";
import { mapMutations } from "vuex";
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
      addBeginTime: 0,
      addLastTime: "",
      selectCourseId: "",
      courseList: [],
      addDialog: false,
    };
  },
  created() {
    this.getCourse();
  },
  methods: {
    ...mapMutations(["GET_SUBID"]),
    // 获取课程
    getCourse() {
      CourseAPI.teacherGetCourse({
        user_id: "201801",
      })
        .then((res) => {
          this.courseList = res.data;
          // console.log(this.courseList);
          res.data.forEach((element, index) => {
            CourseAPI.teacherGetCourseExam({
              user_id: "201801",
              sub_id: element.sub_id,
            })
              .then((result) => {
                result.data.forEach((el) => {
                  el.begin_time = this.getTime(el.begin_time);
                  if (el.exam_status === 0) {
                    el.exam_status = "未开始";
                  } else if (el.exam_status === 1) {
                    el.exam_status = "正在进行";
                  } else if (el.exam_status === 2) {
                    el.exam_status = "未评分";
                  } else if (el.exam_status === 3) {
                    el.exam_status = "已评分";
                  }
                });
                this.$set(this.courseList[index], "examList", result.data);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addExam(id) {
      this.addDialog = true;
      this.selectCourseId = id;
      console.log(id);
    },
    // 添加考试
    submitAdd() {
      console.log(this.addBeginTime);
      addExamAPI
        .teacherAddExam({
          user_id: "201801",
          sub_id: this.selectCourseId,
          exam_name: this.addExamName,
          begin_time: this.addBeginTime,
          last_time: this.addLastTime,
        })
        .then((res) => {
          console.log(res);
          this.GET_SUBID(this.selectCourseId);
          this.$router.push({ path: `/teacher-set-question?id=${res.data}` });
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
      width: 50%;
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
