<template>
  <div>
    <el-card>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="广告名称" prop="title">
          <el-row>
            <el-col :span="6">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入广告名称"
                maxlength="20"
                minlength="3"
                show-word-limit
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投放链接" prop="adLink">
          <el-row>
            <el-col :span="10">
              <el-input placeholder="请输入广告链接" v-model="ruleForm.adLink"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投放时间" required>
          <el-row :span="8">
            <el-col :span="3">
              <el-form-item label required prop="startTime">
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" align="center">至</el-col>
            <el-col :span="3">
              <el-form-item label required prop="stopTime">
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.stopTime"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投放金额" prop="money">
          <el-input-number v-model="ruleForm.money" :min="0" :max="10000000000" label="投放金额"></el-input-number>
        </el-form-item>
        <el-form-item label="投放状态" prop="status">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="投放人昵称" prop="adPeopleName">
          <el-row>
            <el-col :span="6">
              <el-input v-model="ruleForm.adPeopleName"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="封面图" prop="adImg">
          <!-- 上传进度条 -->
          <el-upload
            class="avatar-uploader"
            :action="apiUrl+'/upload/uploadFile'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="uploadFileProcess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.adImg" :src="ruleForm.adImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="up-desc">说明: 上传图片大小不能超过20M,大小不能小于 250*400 像素</span>
          <div v-if="progressFlag" class="progress-box">
            <el-progress :percentage="progressPercent"></el-progress>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="!isEdit" @click="submitForm('ruleForm')">发 布</el-button>
          <el-button type="primary" v-else @click="submitForm('ruleForm')">保 存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "adDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      ruleForm: {
        id: undefined,
        title: "", // 广告title
        adImg: "", // 封面图
        adPeopleName: "", // 投放人名称
        status: true, // 投放状态
        id: null, // 发布人昵称
        adLink: "", // 投放链接
        startTime: "", // 开始投放时间
        stopTime: "", // 投放终止时间
        allTime: "", // 投放总时长
        money: 0, // 投放金额
      },
      rules: {
        title: [
          { required: true, message: "请输入广告名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        money: [
          { required: true, message: "投放金额不能为空", trigger: "change" },
        ],
        status: [
          { required: true, message: "投放状态必须要有", trigger: "change" },
        ],
        adPeopleName: [
          { required: true, message: "请输入投放人昵称", trigger: "blur" },
          { max: 10, message: "长度不能超过10个字符串", trigger: "blur" },
        ],
        adLink: [
          { required: true, message: "请输入广告投放链接", trigger: "blur" },
        ],
        adImg: [
          { required: true, message: "广告封面图不能为空", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "投放起始时间不能为空", trigger: "blur" },
        ],
        stopTime: [
          { required: true, message: "投放终止时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 计算总时天数
          let startTime = new Date(this.ruleForm.startTime);
          let stopTime = new Date(this.ruleForm.stopTime);
          this.ruleForm.allTime = Math.floor(
            (stopTime - startTime) / 1000 / 60 / 60 / 24
          );
          this.$request.fetchAddAd(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              if (!this.isEdit) {
                this.$message.success("新增成功");
              } else {
                this.$message.success("保存成功");
              }
            } else {
              if (!this.isEdit) {
                this.$message.error("新增失败");
              } else {
                this.$message.error("保存失败");
              }
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
      this.ruleForm.adImg = res.msg;
      this.progressPercent = 100; // 防止图片上传成后进度条反应不过来
      setTimeout(() => {
        this.progressFlag = false;
      }, 1000);
    },
    beforeAvatarUpload(file) {
      this.progressFlag = false;
      // 图片尺寸限制
      const isSize = new Promise(function (resolve, reject) {
        let width = 100;
        let height = 100;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          let valid = img.width >= width && img.height >= height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("上传的封面图必须是等于或大于250*400!");
          return Promise.reject();
        }
      );
      return isSize;
      // 图片大小类型限制
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
    // 获取广告详情
    getAdData(id) {
      if (this.isEdit) {
        this.$request.fetchGetAd({ id: id }).then((res) => {
          if (res.data.code === 200) {
            this.ruleForm = res.data.data;
          }
          else if (res.data.code === 500) {
            // this.$message.error("该数据已被删除，正在跳转上一页面");
            // 返回上一级
            this.$router.go(-1);
          } else {
            this.$message.error("数据加载失败");
          }
        });
      }
    },
  },
  mounted() {
    if (this.isEdit) {
      this.getAdData(this.$route.query.id);
    }
  },
  watch: {
    "$route": {
      handler(newVal) {
        if (newVal) {
          this.getAdData(this.$route.query.id);
        }
      },
      deep: true,
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log("sss");
    console.log(to);
    console.log(from);
    console.log(next);
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
  width: 250px;
  height: 400px;
  line-height: 400px;
  text-align: center;
}
.avatar {
  width: 250px;
  height: 400px;
  display: block;
}
.up-desc {
  font-size: 14px;
  color: #999999;
}
.progress-box {
  width: 250px;
}
</style>