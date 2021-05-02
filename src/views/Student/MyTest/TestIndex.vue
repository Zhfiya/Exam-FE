<template>
  <div id="testIndex" class="flex-col">
    <label>· 强化训练 ·</label>
    <div>
      <el-button type="success" @click="dialog = true" plain
        >添加训练</el-button
      >
    </div>
    <label>· 练习记录 ·</label>
    <div class="train_box">
      <div class="train_row" v-for="item in trainList" :key="item.train_id">
        <div class="train_inline">
          <p>{{ item.train_name }}</p>
          -----------------
          <p class="time">时长：{{ item.train_time }}</p>
        </div>
      </div>
    </div>

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
        <el-button type="primary" @click="submitAdd" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TestAPI from "@/service/StudentTest";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      dialog: false,
      subId: null,
      subjects: [],
      score: 100,
      kind: [0, 0, 0, 0],
      diff: 0,
      lastTime: "120",
      trainId: 0,
      trainList: [],
    };
  },
  created() {
    this.getSubject();
    this.getAllTrain();
  },
  methods: {
    submitAdd() {
      TestAPI.addTest({
        kind: this.kind,
        user_id: this.userInfo.user_id,
        sub_id: this.subId,
        score: this.score,
        diff: this.diff / 100,
        train_time: this.lastTime,
      })
        .then((res) => {
          this.trainId = res.data;
          this.$router.push({ path: `/student-test?id=${this.trainId}` });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllTrain() {
      TestAPI.requestStuTrain({
        user_id: this.userInfo.user_id,
      })
        .then((res) => {
          console.log(res);
          this.trainList = res.data;
          this.trainList.forEach((el) => {
            el.train_time = el.train_time / 3600;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSubject() {
      TestAPI.requestStuSub({
        user_id: this.userInfo.user_id,
      })
        .then((res) => {
          this.subjects = res.data;
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
  .train_box {
    background-color: @background;
    height: 450px;
    border-radius: 2px;
    overflow-y: scroll;
    .train_row {
      background-color: @white;
      margin: 10px;
      padding: 20px;
      cursor: pointer;
      // .train_in
    }
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
  .train_box::-webkit-scrollbar {
    display: none;
  }
}
</style>
