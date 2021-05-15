<template>
  <div id="indexTeacher">
    <el-tabs v-model="activeName">
      <el-tab-pane label="科目概览" name="sub">
        <div class="flex-col row">
          <span class="tip">知识点</span>
          <img src="@/assets/Teacher/site-sub.png" alt="" />
          <img src="@/assets/Teacher/site-sub-two.png" alt="" />
          <img src="@/assets/Teacher/site-sub-three.png" alt="" />
          <span class="tip">难度</span>
          <img src="@/assets/Teacher/hard-right.png" alt="" />
          <span class="tip">重要性</span>
          <img src="@/assets/Teacher/importance-right.png" alt="" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="试卷概览" name="exam">
        <div class="flex-col row">
          <span class="tip">分数</span>
          <img src="@/assets/Teacher/score-distribute.png" alt="" />
          <span class="tip">题目正确率</span>
          <img src="@/assets/Teacher/pro-right.png" alt="" />
          <img src="@/assets/Teacher/pro-type-right.png" alt="" />
          <span class="tip">知识点</span>
          <img src="@/assets/Teacher/site-sub.png" alt="" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="学生概览" name="stu">
        <div class="flex-col row">
          <img src="@/assets/Teacher/stu-practice.png" alt="" />
          <img src="@/assets/Teacher/site-sub.png" alt="" />
          <img src="@/assets/Teacher/hard-right.png" alt="" />
        </div>
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
    margin-left: 50px;
    margin-bottom: 40px;
  }
  .tip {
    margin-left: 50px;
    margin-bottom: 15px;
  }
}
</style>
