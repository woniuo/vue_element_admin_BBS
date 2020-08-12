<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="礼包名称" prop="giftName">
        <el-col :span="12">
          <el-input v-model="ruleForm.giftName" :disabled="!isedit"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所属游戏" prop="gameId">
        <template v-if="gameList && gameList.length>0">
          <el-select v-model="ruleForm.gameId" placeholder="请选择所属游戏" :disabled="!isedit">
            <el-option v-for="item in gameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="礼包总数" prop="giftTotal">
            <el-input-number
              v-model="ruleForm.giftTotal"
              :min="0"
              :max="1000000"
              :precision="0"
              label="礼包总数"
              :disabled="!isedit"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="已领取数" prop="getCount">
            <el-input-number
              v-model="ruleForm.getCount"
              :min="0"
              :max="1000000"
              :precision="0"
              label="已领取数"
              :disabled="!isedit"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="最高领取次数" prop="limitUse">
            <el-input-number
              v-model="ruleForm.limitUse"
              :min="0"
              :max="1000000"
              :precision="0"
              label="最高领取次数"
              :disabled="!isedit"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="消耗积分" prop="integralCost">
            <el-input-number
              v-model="ruleForm.integralCost"
              :min="0"
              :max="1000000"
              :precision="0"
              label="消耗积分"
              :disabled="!isedit"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="礼包简介" prop="giftDescribe">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="ruleForm.giftDescribe"
          maxlength="150"
          show-word-limit
          :disabled="!isedit"
        ></el-input>
      </el-form-item>
      <el-form-item label="礼包封面" prop="cover">
        <!-- 上传进度条 -->
        <el-upload
          class="avatar-uploader"
          :action="apiUrl+'/upload/uploadFile'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-progress="uploadFileProcess"
          :before-upload="beforeAvatarUpload"
          :disabled="!isedit"
        >
          <img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span class="up-desc">说明: 上传图片大小不能超过20M</span>
        <div v-if="progressFlag" class="progress-box">
          <el-progress :percentage="progressPercent"></el-progress>
        </div>
      </el-form-item>
      <el-form-item v-if="isedit">
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "giftBag",
  props: {
    isedit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      gameList: [], // 所属游戏
      ruleForm: {
        giftName: "", // 礼包名称
        giftDescribe: "", // 礼包简介
        giftTotal: 0, // 礼包总数量
        getCount: 0, // 已领取次数
        limitUse: false, // 限领次数
        integralCost: 0, // 积分花费
        cover: "", // 礼包封面图
        gameId: null, // 游戏id
        id: null, // 礼包id
      },
      rules: {
        giftName: [
          { required: true, message: "请输入礼包名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        giftDescribe: [
          { required: true, message: "请输入相关礼包简介", trigger: "blur" },
        ],
        giftTotal: [
          { required: true, message: "礼包总数不能为空", trigger: "change" },
        ],
        getCount: [
          {
            required: true,
            message: "礼包已领取数量不能为空",
            trigger: "change",
          },
        ],
        limitUse: [
          {
            required: true,
            message: "礼包限制领取次数不能为空",
            trigger: "change",
          },
        ],
        integralCost: [
          {
            required: true,
            message: "领取礼包消耗积分不能为空",
            trigger: "change",
          },
        ],
        cover: [
          { required: true, message: "礼包封面不能为空", trigger: "change" },
        ],
        gameId: [
          {
            required: true,
            message: "请选择礼包所属游戏",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchEditGiftBag(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("保存成功");
            } else {
              this.$message.error("保存失败");
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
    handleAvatarSuccess(res, file) {
      this.ruleForm.cover = res.msg;
      this.progressPercent = 100; // 防止图片上传成后进度条反应不过来
      setTimeout(() => {
        this.progressFlag = false;
      }, 1000);
    },
    beforeAvatarUpload(file) {
      this.progressFlag = false;
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (
        ["image/jpg", "image/png", "image/gif", "image/jpeg"].indexOf(
          file.type
        ) == -1
      ) {
        this.$message.error("上传图片只能是jpg|jpeg|png|gif格式!");
        return false;
      }
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过 20MB!");
        return false;
      }
    },
    uploadFileProcess(event, file, fileList) {
      fileList.forEach((item) => {
        if (item.percentage === 100) {
        } else {
          this.progressFlag = true;
          this.progressPercent = Math.abs(item.percentage.toFixed(0));
        }
      });
    },
    getGiftBag(id) {
      this.$request.fetchGetGiftBag({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.data;
        } else {
          this.$message.error("数据获取失败");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
.up-desc {
  font-size: 14px;
  color: #999999;
}
.progress-box {
  width: 200px;
}
</style>