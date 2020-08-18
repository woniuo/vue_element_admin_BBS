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
              <el-button type="primary" size="mini" @click="save(index, item.id)" v-role-btn="'147'">保 存</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="animate__animated animate__fadeInLeft">
      <el-col :span="24">
        <el-card class="sign-title">
          <el-row>
            <el-col :span="12">签到扩展配置</el-col>
            <el-col :span="12" align="right">
              <el-button type="primary" @click="addSignConfig" v-role-btn="'148'">新 增</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="ID" width="100"></el-table-column>
              <el-table-column prop="bonusDay" label="累计签到天数" width="180">
                <template slot-scope="scope">
                  <el-tag type="primary">{{scope.row.bonusDay}} 天</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="bonusIntegral" label="累计签到获取的积分" align="center">
                <template slot-scope="scope">
                  <el-tag type="primary">{{scope.row.bonusIntegral}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="bonusExp" label="累计签到获取的经验" align="center">
                <template slot-scope="scope">
                  <el-tag type="primary">{{scope.row.bonusExp}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="editSignConfig(scope.$index, scope.row.id)"
                    v-role-btn="'149'"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="delSignConfig(scope.$index, scope.row.id)"
                    v-role-btn="'150'"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <template>
      <el-dialog
        :title="signTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="累计签到天数" prop="bonusDay">
            <el-input-number
              v-model="ruleForm.bonusDay"
              :min="1"
              :max="365"
              :precision="0"
              label="一天最高获取次数"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="累计签到获取的积分" prop="bonusIntegral">
            <el-input-number v-model="ruleForm.bonusIntegral" :min="0" label="累计签到获取的积分"></el-input-number>
          </el-form-item>
          <el-form-item label="累计签到获取的经验" prop="bonusExp">
            <el-input-number v-model="ruleForm.bonusExp" :min="0" label="累计签到获取的经验"></el-input-number>
          </el-form-item>
          <el-form-item align="right">
            <el-button @click="resetForm('ruleForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>
<script>
export default {
  name: "integralManage",
  data() {
    return {
      num: 0,
      integralData: [],
      tableData: [
        {
          id: 1,
          bonusDay: 1,
          bonusIntegral: 20,
          bonusExp: 30,
        },
      ],
      dialogVisible: false, // 弹出框
      signTitle: "", // 提示title
      ruleForm: {
        id: null,
        bonusDay: 0,
        bonusIntegral: 0,
        bonusExp: 0,
      },
      rules: {
        bonusDay: [
          { required: true, message: "请输入累计天数", trigger: "change" },
        ],
        bonusIntegral: [
          { required: true, message: "请输入增加积分", trigger: "change" },
        ],
        bonusExp: [
          { required: true, message: "请输入增加经验值", trigger: "change" },
        ],
      },
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
    // 签到相关配置
    handleClose(done) {
      done();
    },
    addSignConfig() {
      this.signTitle = "新增";
      this.dialogVisible = true;
    },
    editSignConfig(index, id) {
      this.signTitle = "修改";
      this.getSignConfig(id);
      this.dialogVisible = true;
    },
    delSignConfig(index, id) {
      this.$request.fetchDelSignConfig({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.tableData.splice(index, 1);
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      });
      console.log(id);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchAddSignConfig(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(this.signTitle + "成功");
              this.getSignConfigList();
              this.dialogVisible = false;
            } else {
              this.$message.error(this.signTitle + "失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取单个签到配置信息
    getSignConfig(id) {
      this.$request.fetchGetSignConfig({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.data;
        } else {
          this.$message.error("签到配置数据获取失败");
        }
      });
    },
    // 获取签到配置列表
    getSignConfigList(id) {
      this.$request.fetchGetSignConfigList({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error("签到配置数据获取失败");
        }
      });
    },
  },
  mounted() {
    this.getList();
    this.getSignConfigList();
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
.sign-title {
  margin-top: 20px;
  background: #fbc33e;
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
}
</style>