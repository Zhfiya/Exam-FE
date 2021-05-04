<template>
  <div id="personalCenter">
    <div class="flex-col">
      <label>Hi！{{ this.userInfo.user_name }}</label>
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
          <p class="before">电话：</p>
          <p>{{ userInfo.user_phone }}</p>
        </div>
        <div class="flex-row basic_row">
          <p class="before">邮箱：</p>
          <p>{{ userInfo.email }}</p>
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
          <el-button @click="update" type="success" plain>修改</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="updateDialog" width="30%" center>
      <div class="flex-col">
        <div class="info_row flex-row">
          <p>旧密码：</p>
          <el-input v-model="oldPwd" show-password></el-input>
        </div>
        <div class="info_row flex-row">
          <p>新密码：</p>
          <el-input v-model="newPwd" show-password></el-input>
        </div>
        <div class="info_row flex-row">
          <p>确认密码：</p>
          <el-input v-model="surePwd" show-password></el-input>
        </div>
        <label v-show="isShow">两次密码输入不一致！</label>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="updateDialog = false"
          >取 消</el-button
        >
        <el-button @click="submitUpdate" type="primary" plain>确 定</el-button>
      </span>
    </el-dialog>
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
      updateDialog: false,
      oldPwd: "",
      newPwd: "",
      surePwd: "",
      isShow: false,
    };
  },
  created() {
    if (this.userInfo.role === "student") {
      this.userRole = "学生";
    } else {
      this.userRole = "教师";
    }
  },
  methods: {
    update() {
      this.updateDialog = true;
    },
    submitUpdate() {
      if (this.newPwd !== this.surePwd) {
        this.isShow = true;
      } else {
        this.updateDialog = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../style/common.less");
#personalCenter {
  color: @primaryText;
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
  /deep/ .el-dialog {
    .info_row {
      margin-bottom: 10px;
    }
    label {
      font-weight: normal;
      font-size: 12px;
      margin-bottom: 0;
      margin-top: 10px;
      color: @dangerColor;
    }
    p {
      width: 100px;
      line-height: 40px;
    }
    .el-input {
      width: 50%;
    }
  }
  /deep/ .el-dialog__footer {
    .el-button {
      padding: 10px;
    }
  }
  /deep/ .el-dialog__body {
    padding: 10px 40px;
  }
  .el-button {
    padding: 10px;
  }
}
</style>
