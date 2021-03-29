<template>
  <div id="app">
    <el-container>
      <el-header class="header">
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
export default {
  components: {
    TheHeader,
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
