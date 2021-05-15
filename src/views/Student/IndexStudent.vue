<template>
  <div id="indexStudent">
    <el-tabs v-model="activeName">
      <el-tab-pane label="科目概览" name="sub">
          <div class="flex-col row">
            <img src="@/assets/Student/site-sub-three.png" alt="" />
            <img src="@/assets/Teacher/hard-right.png" alt="" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="试卷概览" name="exam">
          <div class="flex-col row">
            <img src="@/assets/Student/site-sub.png" alt="" />
            <img src="@/assets/Student/site-sub-two.png" alt="" />
            <img src="@/assets/Student/site-sub-three.png" alt="" />
          </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url("../../style/common.less");
#indexStudent {
  .row {
    width: 60%;
  }
  img {
    margin-left: 100px;
    margin-bottom: 50px;
  }
  /deep/ .el-tabs__nav-scroll {
    background-color: @background;
    padding: 5px 10px;
    border-radius: @smallBorderRadius;
  }
  /deep/ .el-tabs__item.is-active {
    color: @correlateColor2;
  }
  /deep/ .el-tabs__active-bar {
    background-color: @correlateColor2;
  }
}
</style>
