<template>
  <div>
    <el-row
      :span="24"
      :gutter="20"
      class="animate__animated animate__fadeInDown"
      v-if="integralData.length>0"
    >
      <el-col :span="6" v-for="(item, index) in integralData" :key="item.id">
        <el-card>
          <el-row class="mg10">
            <el-col align="center" :span="24">
              <el-card v-if="index === 0" class="itm uplike">{{item.taskName}}</el-card>
              <el-card v-else-if="index === 1" class="itm comment">{{item.taskName}}</el-card>
              <el-card v-else-if="index === 2" class="itm publish">{{item.taskName}}</el-card>
              <el-card v-else-if="index === 3" class="itm sign">{{item.taskName}}</el-card>
            </el-col>
            <el-col class="mg10">
              <el-card>
                一次增加经验值:
                <el-input-number v-model="item.finishExp" :min="0" label="增加经验值"></el-input-number>
              </el-card>
            </el-col>
            <el-col class="mg10">
              <el-card>
                一次增加积分值:
                <el-input-number v-model="item.finishIntegral" :min="0" label="增加积分值"></el-input-number>
              </el-card>
            </el-col>
            <el-col class="mg10">
              <el-card>
                一天最高获取次数:
                <el-input-number v-model="item.dayTimes" :min="0" label="一天最高获取次数"></el-input-number>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col align="right">
              <el-button type="primary" size="mini" @click="save(index, item.id)">保 存</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "integralManage",
  data() {
    return {
      num: 0,
      integralData: [],
    };
  },
  methods: {
    // 保存
    save(index, id) {
      this.$request.fetchSetIntegray(this.integralData[index]).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    getList() {
      this.$request.fetchGetIntegrayList().then((res) => {
        if (res.data.code === 200) {
          this.integralData = res.data.data;
        } else {
          this.$message.error("数据加载失败");
        }
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
$font-s28: 28px;
$font-w700: 700;
$color-w: #ffffff;
.mg10 {
  margin: 10px auto;
}
.itm {
  font-size: $font-s28;
  font-weight: $font-w700;
  color: $color-w;
}
.uplike {
  background: #409ffd;
  :hover {
    color: #409ffd;
    background: $color-w;
  }
}
.comment {
  background: #d89351;
  :hover {
    color: #d89351;
    background: $color-w;
  }
}
.publish {
  background: #67c139;
  :hover {
    color: #67c139;
    background: $color-w;
  }
}
.sign {
  background: #f36b6a;
  :hover {
    color: #f36b6a;
    background: $color-w;
  }
}
</style>