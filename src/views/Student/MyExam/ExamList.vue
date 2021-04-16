<template>
    <div id="examList">
        <label>我的考试</label>
        <div class="list_box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="all">
                    <div
                    v-for="item in examAll"
                    :key="item.exam_id"
                    >
                        <exam-card></exam-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未开始" name="none">
                    <div
                    v-for="item in examNone"
                    :key="item.exam_id"
                    >
                        <exam-card></exam-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="正在进行" name="ing">
                    <div
                    v-for="item in examIng"
                    :key="item.exam_id"
                    >
                        <exam-card></exam-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已结束" name="end">
                    <div
                    v-for="item in examEnd"
                    :key="item.exam_id"
                    >
                        <exam-card></exam-card>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ExamCard from "./Component/ExamCard"
export default {
    components: {
        ExamCard
    },
    data() {
        return {
            activeName:'all',
            examAll:[{
                exam_id:1,
            },{
                exam_id:2,
            }],
            examNone:[{
                exam_id:1,
            }],
            examIng:[{
                exam_id:1,
            },{
                exam_id:2,
            }],
            examEnd:[{
                exam_id:1,
            },{
                exam_id:2,
            }]
        }
    },
    methods: {
      handleClick(tab) {
        console.log(tab.name);
      }
    }
}
</script>

<style lang="less" scoped>
@import url('../../../style/common.less');
#examList{
    label {
        margin-left: 100px;
        padding: 10px;
        background-color: @correlateColor2;
        font-weight: bold;
        color: @white;
        border-radius: @smallBorderRadius;
    }
    .list_box {
        margin-top: 20px;
        padding: 0 100px;
        /deep/ .el-tabs__nav-scroll {
            background-color: @background;
            padding: 5px 10px;
            border-radius: @smallBorderRadius;
        }
        /deep/ .el-tabs__item.is-active {
            color: @correlateColor2;
        }
        /deep/ .el-tabs__active-bar {
            background-color: @correlateColor2;
        }
    }
}
</style>