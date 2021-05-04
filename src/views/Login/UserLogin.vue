<template>
  <div id="login" class="flex-row">
    <div class="fex-col login_box">
      <label>· 登录 ·</label>
      <div class="login_inline flex-col">
        <div class="flex-row info_row">
          <p>电话号码</p>
          <input type="text" v-model="id" />
        </div>
        <div class="flex-row info_row">
          <p>密码</p>
          <input type="password" v-model="pwd" />
          <span v-if="isShow">用户id或密码错误</span>
        </div>
        <div class="flex-row button_row">
          <button @click="login">登录</button>
          <!-- <button class="register_button">注册</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      id: "",
      pwd: "",
      isShow: false,
    };
  },
  created() {
    window.addEventListener("keydown", this.handleKeyDown, true);
  },
  methods: {
    ...mapMutations(["GET_USERINFO"]),
    login() {
      const role = 0;
      let role1 = "";
      if (role === 0) {
        this.$router.push("/index-teacher");
        role1 = "teacher";
      } else {
        this.$router.push("/student-exam-list");
        role1 = "student";
      }
      this.isShow = true;
      this.GET_USERINFO({
        user_id: this.id,
        role: role1,
        user_name: "fine",
      });
    },
    handleKeyDown(e) {
      let key = null;
      if (window.event === undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key === 13) {
        this.login();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../style/common.less");
#login {
  // background: @background;
  justify-content: center;
  .login_box {
    margin-top: 100px;
    width: 50%;
    padding: 20px 50px;
    border: 1px solid @baseBorder;
    box-shadow: 5px 5px 5px #c0c4cc;
  }
  label {
    font-weight: bold;
    color: #263d6e;
    font-size: 22px;
  }
  .login_inline {
    margin-top: 20px;
  }
  .info_row {
    p {
      line-height: 60px;
      color: @regularText;
      margin-right: 20px;
      width: 80px;
    }
    span {
      line-height: 60px;
      margin-left: 20px;
      font-size: small;
      color: @warningColor;
    }
  }
  input {
    width: 60%;
    height: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 15px 0;
    background-color: #fafafa;
    border-bottom: 1px solid rgba(0, 0, 0, 0.27);
    transition: all 0.5s ease;
  }
  button {
    margin-top: 20px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 2px;
    padding: 5px 10px;
    width: 100px;
    font-size: 15px;
    background-color: #5379a5c4;
    cursor: pointer;
    outline: none;
    margin-right: 50px;
  }
  .register_button {
    background-color: silver;
  }
  button:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
  }
}
</style>
