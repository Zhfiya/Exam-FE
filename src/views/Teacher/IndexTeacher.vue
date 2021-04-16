<template>
  <div id="indexTeacher">
    <label class="title">我管理的</label>
    <div class="course_box">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="item in courseList"
          :key="item.course_id"
          :title="item.name"
          :name="item.name"
        >
          <p class="detail">这门课程</p>
          <course-card></course-card>
        </el-collapse-item>
      </el-collapse>
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
      courseList: [
        {
          course_id: 1,
          name: "数据库",
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
  .title {
    padding: 10px;
    background-color: @background;
    color: @primaryText;
  }
  .course_box {
    margin-top: 20px;
    .detail {
      margin-bottom: 10px;
    }
    /deep/ .el-collapse-item {
      font-size: 16px;
    }
  }
}
</style>
