<template>
  <div id="indexTeacher">
    <el-tabs v-model="activeName">
      <el-tab-pane label="科目详情" name="sub">
        <div class="flex-col row">
          <img src="@/assets/Teacher/site-sub.png" alt="" />
          <img src="@/assets/Teacher/site-sub-two.png" alt="" />
          <img src="@/assets/Teacher/site-sub-three.png" alt="" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="试卷详情" name="exam">
        <img src="@/assets/Teacher/site-sub.png" alt="" />
      </el-tab-pane>
      <el-tab-pane label="学生详情" name="stu">
        <img src="@/assets/Teacher/site-sub.png" alt="" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "sub",
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../../style/common.less");
#indexTeacher {
  .row {
    width: 60%;
  }
  img {
    margin-left: 100px;
    margin-bottom: 50px;
  }
}
</style>
