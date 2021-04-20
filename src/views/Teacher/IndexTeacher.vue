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
            <el-button type="primary" plain>添加考试</el-button>
          </div>
          <div
          v-for="it in item.examList"
          :key="it.exam_id">
            <course-card :examDetail="it"></course-card>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- <p class="a">sss</p> -->
    </div>
  </div>
</template>

<script>
import CourseCard from "./Component/CourseCard";
export default {
  components: {
    CourseCard,
  },
  data() {
    return {
      activeName: "1",
      courseCode: "BKFRUV",
      studentNum: 13,
      courseList: [
        {
          course_id: 1,
          name: "数据库",
          examList:[{
            exam_id:1,
            name: "第一次考试",
            status: "未改卷",
            time: "2020-04-19",
            studentNum: 59,
          },{
            exam_id:2,
            name: "第二次考试",
            status: "考试进行中",
            time: "2020-04-19",
            studentNum: 59,
          }],
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
    };
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
        justify-content:space-between;
      }
      .el-button {
        padding: 10px;
      }
    }
  }
  .add_row {
    margin-top: 50px;

  }
.course_box::-webkit-scrollbar {
  display: none;
}
}
</style>
