<template>
  <div id="personalCenter">
    <div class="flex-col">
      <label>Hi！{{ this.userName }}</label>
      <el-divider content-position="left">基本信息</el-divider>
      <div class="basic_info flex-col">
        <div class="basic_row flex-row">
          <p class="before">姓名：</p>
          <p>{{ userInfo.user_name }}</p>
        </div>
        <div class="flex-row basic_row">
          <p class="before">学号：</p>
          <p>{{ userInfo.user_id }}</p>
        </div>
        <div class="flex-row basic_row">
          <p class="before">角色：</p>
          <p>{{ userRole }}</p>
        </div>
      </div>
      <el-divider content-position="left">安全信息</el-divider>
      <div class="safe_info">
        <div class="flex-row safe_row">
          <p class="before">修改密码</p>
          <el-button type="success" plain>验证</el-button>
        </div>
        <div class="flex-row safe_row">
          <p class="before">修改邮箱</p>
          <p>{{ userInfo.email }}</p>
          <el-button type="success" plain>验证</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      userRole: "学生",
    };
  },
  created() {
    if (this.userInfo.role === "student") {
      this.userRole = "学生";
    } else {
      this.userRole = "教师";
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../style/common.less");
#personalCenter {
  color: @primaryText;
  background-color: @lighterBackground;
  padding: 20px;
  height: 620px;
  label {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 50px;
  }
  .basic_info {
    padding: 40px 20px;
    .basic_row {
      margin-bottom: 20px;
      .before {
        width: 100px;
      }
    }
  }
  .safe_info {
    padding: 40px 20px;
    .safe_row {
      margin-bottom: 20px;
      p {
        line-height: 40px;
        margin-right: 20px;
      }
      .before {
        width: 100px;
      }
    }
  }
  /deep/ .el-divider__text {
    color: @regularText;
    padding: 5px;
  }
  .el-button {
    padding: 10px;
  }
}
</style>
