<template>
  <div id="courseCard" class="flex-col">
    <div class="flex-row title">
      <img src="@/assets/Teacher/indexCourse.png" alt="">
      <p>{{ examDetail.name }}</p>
    </div>
    <div class="flex-row">
      <img src="@/assets/Teacher/indexTime.png" alt="">
      <p>考试时间：</p>
      <p>{{ examDetail.time }}</p>
    </div>
    <div class="flex-row">
      <img src="@/assets/Teacher/indexPeople.png" alt="">
      <p>考生人数：</p>
      <p>{{ examDetail.studentNum}}</p>
    </div>
    <div class="flex-row status_row">
      <img src="@/assets/Teacher/indexStatus.png" alt="">
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
    img {
      margin-top: 7px;
    }
  }
  button {
    margin-left: 20px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
</style>
