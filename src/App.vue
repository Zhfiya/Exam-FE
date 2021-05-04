<template>
  <div id="app">
    <el-container class="flex-col">
      <el-header class="header" v-if="userInfo.role">
        <the-header></the-header>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import { mapState } from "vuex";
export default {
  components: {
    TheHeader,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>

<style lang="less">
html,
body,
#app,
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
  min-width: 1000px;
  background-color: #fafafa;
}
.main {
  overflow-y: scroll;
}
.main::-webkit-scrollbar {
  display: none;
}
.header {
  padding: 0;
  min-width: 1000px;
}
</style>
