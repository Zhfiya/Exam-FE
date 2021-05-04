<template>
  <div
    id="theHeader"
    :class="{ teacher: role === 'teacher', student: role === 'student' }"
  >
    <div class="logoBox">
      <el-tooltip
        content="前往首页"
        placement="bottom-start"
        :open-delay="500"
        effect="light"
      >
        <img
          src="@/assets/icon.png"
          class="logo"
          @click="goTo('/student-exam-list')"
          v-if="role === 'student'"
        />
        <img
          src="@/assets/icon.png"
          class="logo"
          @click="goTo('/index-teacher')"
          v-else
        />
      </el-tooltip>
    </div>
    <div class="headerBox">
      <p class="name" v-if="role === 'teacher'">考试平台-教师端</p>
      <p class="name" v-else>考试平台</p>
      <div class="itemBox">
        <!-- <p
          class="item"
          @click="goTo('/student-exam-list')"
          v-if="role === 'student'"
        >
          我的考试
        </p> -->
        <p class="item" @click="goTo('/test-index')" v-if="role === 'student'">
          练习中心
        </p>
        <!-- <p class="item" v-if="role === 'teacher'">题库</p> -->
        <!-- <p class="item" v-if="role === 'teacher'">阅卷中心</p> -->
        <p class="item" @click="goTo('/personal-center')">个人中心</p>
        <p class="item">退出登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      role: "",
    };
  },
  created() {
    this.role = this.userInfo.role;
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
@import "../style/common.less";
#theHeader {
  height: 100%;
  color: white;
  box-shadow: 0 1px 1px 0 #e7ebf2;
  transform: translate3d(0, 0, 0);
  display: flex;
  justify-content: space-between;
  .logoBox {
    height: 100%;
    width: 60px;
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
.teacher {
  background-color: @tcorrelateColor4;
}
.student {
  background-color: @primaryColor;
}
</style>
