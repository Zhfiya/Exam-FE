<template>
  <div id="testIndex" class="flex-col">
    <label>· 强化训练 ·</label>
    <div>
      <el-button type="success" @click="dialog = true" plain
        >添加训练</el-button
      >
    </div>
    <label>· 练习记录 ·</label>
    <el-dialog title="添加训练" :visible.sync="dialog" width="40%" center>
      <div class="flex-col">
        <div class="info_row flex-row">
          <p>考试科目：</p>
          <el-select v-model="subId">
            <el-option
              v-for="item in subjects"
              :key="item.sub_id"
              :label="item.sub_name"
              :value="item.sub_id"
            ></el-option>
          </el-select>
        </div>
        <div class="info_row flex-row">
          <p>时长：</p>
          <el-input v-model="lastTime">
            <template slot="append">min</template>
          </el-input>
        </div>
        <div class="info_row flex-row">
          <p>分数：</p>
          <el-input v-model="score"></el-input>
        </div>
        <div class="info_row flex-row">
          <p>选择题：</p>
          <el-input v-model="kind[0]"></el-input>
        </div>
        <div class="info_row flex-row">
          <p>填空题：</p>
          <el-input v-model="kind[1]"></el-input>
        </div>
        <div class="info_row flex-row">
          <p>判断题：</p>
          <el-input v-model="kind[2]"></el-input>
        </div>
        <div class="info_row flex-row">
          <p>编程题：</p>
          <el-input v-model="kind[3]"></el-input>
        </div>
        <div class="info_row flex-row">
          <p>区分度:</p>
          <el-slider v-model="diff"> </el-slider>
        </div>
        <div class="info_row flex-row">
          <p class="tip">注：默认时长120分钟，默认满分100分</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="dialog = false">取 消</el-button>
        <el-button type="primary" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TestAPI from "@/service/StudentTest";
export default {
  data() {
    return {
      dialog: false,
      subId: null,
      subjects: [
        {
          sub_id: 1,
          sub_name: "java",
        },
        {
          sub_id: 2,
          sub_name: "c",
        },
      ],
      score: 100,
      kind: [0, 0, 0, 0],
      diff: 0,
      lastTime: 120,
    };
  },
  methods: {
    submitAdd() {
      TestAPI.addtest({
        kind: this.kind,
        sub_id: this.subId,
        score: this.score,
        diff: this.diff / 100,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../style/common.less");
#testIndex {
  label {
    font-weight: bold;
    font-size: 18px;
    color: @primaryColor;
    margin: 30px 0;
  }
  /deep/ .el-dialog {
    .info_row {
      margin-bottom: 10px;
    }
    p {
      width: 100px;
      line-height: 40px;
    }
    .tip {
      width: auto;
      color: @warningColor;
    }
    .el-input {
      width: 60%;
    }
    .el-slider {
      width: 60%;
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
  /deep/ .el-button {
    padding: 10px;
  }
}
</style>
