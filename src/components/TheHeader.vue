<template>
  <div id="theHeader">
    <div class="logoBox">
      <el-tooltip
        content="前往首页"
        placement="bottom-start"
        :open-delay="500"
        effect="light"
      >
        <img src="@/assets/icon.png" class="logo" @click="goTo('/')" />
      </el-tooltip>
    </div>
    <div class="headerBox">
      <p class="name">学生成绩检测平台</p>
      <div class="itemBox">
        <p class="item" @click="goTo('/student-exam-list')">我的考试</p>
        <p class="item">练习中心</p>
        <p class="item" @click="goTo('/personal-center')">个人中心</p>
        <p class="item">题库</p>
        <p class="item">阅卷中心</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/common.less";
#theHeader {
  height: 100%;
  color: white;
  background-color: @primaryColor;
  box-shadow: 0 1px 1px 0 #e7ebf2;
  transform: translate3d(0, 0, 0);
  display: flex;
  justify-content: space-between;
  .logoBox {
    height: 100%;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      height: 37px;
      width: 37px;
      cursor: pointer;
    }
  }
  .headerBox {
    margin-left: 0;
    height: 100%;
    width: 100%;
    min-width: 880px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-right: 25px;
    box-sizing: border-box;
    position: relative;
    .name {
      height: 23px;
      width: 100%;
      font-size: 23px;
      font-weight: bolder;
      line-height: 23px;
    }
    .itemBox {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .item {
        height: 100%;
        padding: 0 25px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        .text {
          height: 20px;
          font-size: 13px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
