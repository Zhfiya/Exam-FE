<template>
  <div id="courseCard" class="flex-col">
    <div class="title">
      <p>{{ examDetail.name }}</p>
    </div>
    <div class="flex-row">
      <p>考试时间：</p>
      <p>{{ examDetail.time }}</p>
    </div>
    <div class="flex-row">
      <p>考生人数：</p>
      <p>{{ examDetail.studentNum}}</p>
    </div>
    <div class="flex-row status_row">
      <p>考试状态：</p>
      <p>{{ examDetail.status }}</p>
      <el-button size="small" type="info" plain>{{ statusAction }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    examDetail:{
      required:true,
    }
  },
  data() {
    return {
      statusAction: "阅卷",
    }
  },
  created() {
    console.log(this.examDetail);
    if(this.examDetail.status === '未改卷') {
      this.statusAction = "阅卷";
    } else if (this.examDetail.status === '考试进行中') {
      this.statusAction = "修改时间";
    }
  }
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
  }
  button {
    margin-left: 20px;
  }
}
</style>
