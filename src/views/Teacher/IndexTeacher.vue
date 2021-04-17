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
          class="flex-col"
        >
          <div class="flex-row">
            <p class="detail">课程代码：KBGFRS</p>
            <p class="detail">课程人数：</p>
          </div>
          <course-card></course-card>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="add_row"></div>
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
  padding: 0 5%;
  .title {
    padding: 10px;
    background-color: @background;
    color: @primaryText;
  }
  .course_box {
    margin-top: 20px;
    color: @regularText;
    .detail {
      margin-bottom: 10px;
      margin-right: 10px;
      color: @regularText;
    }
    /deep/ .el-collapse-item__header {
      font-size: 18px;
      padding: 0 10px;
    }
    /deep/ .el-collapse-item__content {
      font-size: 14px;
      padding: 20px;
      background: @lighterBackground;
    }
  }
}
</style>
