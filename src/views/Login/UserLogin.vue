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
import LoginAPI from "@/service/Login";
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
      // 18582189771 学生
      // 17728881096 老师
      LoginAPI.requestLogin({
        telephone: this.id,
        password: this.pwd,
      })
        .then((res) => {
          if (res.code === 200) {
            let role = "";
            if (res.data.authority === 1) {
              this.$router.push("/index-teacher");
              role = "teacher";
            } else {
              this.$router.push("/index-student");
              role = "student";
            }
            this.GET_USERINFO({
              user_id: res.data.id,
              role,
              user_name: res.data.user_name,
              user_phone: this.id,
              email: res.data.email,
            });
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // const role = 1;
      // let role1 = "";

      // this.isShow = true;
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
