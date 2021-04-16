<template>
  <div id="examCard">
    <div class="info_row flex-row">
      <p class="title">第一次考试</p>
      <p class="time">2020-04-28</p>
    </div>
    <div class="info_row flex-row">
      <p class="min">学科：</p>
    </div>
    <div class="info_row flex_row">
      <p class="min">状态：</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url("../../../../style/common.less");
#examCard {
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
</style>
