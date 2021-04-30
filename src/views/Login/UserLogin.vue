<template>
  <div id="login" class="flex-col">
    <label>考试平台 · 登录</label>
    <div class="flex-row info_row">
      <p>用户id</p>
      <input type="text" />
    </div>
    <div class="flex-row info_row">
      <p>密码</p>
      <input type="password" />
      <span>用户id或密码错误</span>
    </div>
    <div class="flex-row button_row">
      <button>登录</button>
      <button class="register_button">注册</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url("../../style/common.less");
#login {
  // background: @background;
  padding: 50px;
  width: 50%;
  border: 1px solid @baseBorder;
  label {
    font-weight: bold;
    color: @primaryText;
    font-size: 22px;
    margin-bottom: 20px;
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
    width: 50%;
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
