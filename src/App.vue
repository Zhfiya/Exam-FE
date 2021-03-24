<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <the-header></the-header>
      </el-header>
      <el-container class="main">
        <el-aside>
          <the-aside></the-aside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheAside from "./components/TheAside";
export default {
  components: {
    TheHeader,
    TheAside,
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
}
.header {
  padding: 0;
  min-width: 1000px;
}
</style>
