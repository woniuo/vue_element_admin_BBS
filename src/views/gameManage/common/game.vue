<template>
  <div>
    <el-form
      :model="gmRuleForm"
      :rules="gmRules"
      ref="gmRuleForm"
      label-width="100px"
      class="hide-relative"
    >
      <div class="hide-loading" v-if="loading">
        <el-icon class="el-icon-loading" style="font-size:30px"></el-icon>
        <span>加载中...</span>
      </div>
      <el-card class="mt5">
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <el-form-item label="游戏名称" prop="name">
                  <el-input v-model="gmRuleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="下载次数" prop="downloadCount">
                  <el-input-number v-model="gmRuleForm.downloadCount" :min="0" label="下载次数"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="游戏类型" prop="typeIds">
                  <el-select
                    v-model="gmRuleForm.typeIds"
                    multiple
                    placeholder="请选择"
                    @change="$forceUpdate()"
                  >
                    <el-option
                      v-for="item in gameTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="游戏简介" prop="description">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="gmRuleForm.description"
                    maxlength="500"
                    show-word-limit
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-row>
        <el-col :span="12">
          <el-card class="mt5">
            <el-form-item label="游戏封面图" prop="cover">
              <!-- 上传进度条 -->
              <el-upload
                class="avatar-uploader"
                :action="apiUrl+'/upload/uploadFile'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-progress="uploadFileProcess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="gmRuleForm.cover" :src="gmRuleForm.cover" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span class="up-desc">说明: 上传图片大小不能超过20M</span>
              <div v-if="progressFlag" class="progress-box">
                <el-progress :percentage="progressPercent"></el-progress>
              </div>
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="mt5">
            <el-form-item label="游戏背景图" prop="cover">
              <!-- 上传进度条 -->
              <el-upload
                class="avatar-uploader"
                :action="apiUrl+'/upload/uploadFile'"
                :show-file-list="false"
                :on-success="bgHandleAvatarSuccess"
                :on-progress="uploadFileProcess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="gmRuleForm.backgroundImg" :src="gmRuleForm.backgroundImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span class="up-desc">说明: 上传图片大小不能超过20M</span>
              <div v-if="progressFlag" class="progress-box">
                <el-progress :percentage="progressPercent"></el-progress>
              </div>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="mt5">
        <el-form-item label="游戏截图" prop="screenshots">
          <el-upload
            :action="apiUrl+'/upload/uploadFile'"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .gif, .GIF"
            :before-upload="beforeAvatarUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handlePictureSuccess"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="gmRuleForm.screenshots"
            :class="{'hide_up':hideUpload}"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
          <span class="up-desc">说明: 上传图片大小不能超过20M,最多可上传12张</span>
        </el-form-item>
      </el-card>
      <el-form-item align="right">
        <el-button type="primary" @click="submitForm('gmRuleForm')" v-if="!isedit">发 布</el-button>
        <el-button type="primary" @click="submitForm('gmRuleForm')" v-else>保 存</el-button>
        <el-button @click="resetForm('gmRuleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "game",
  props: {
    isedit: {
      type: Boolean,
      default: false,
    },
    gameid: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      bgProgressFlag: false, // 进度条是否显示
      bgProgressPercent: 0,
      gmRuleForm: {
        id: this.gameid, // 游戏id
        name: "", // 游戏名称
        description: "", // 游戏简介
        downloadCount: 0, // 下载次数
        typeIds: null, // 游戏类型
        cover: "", // 游戏封面图
        backgroundImg: "", // 游戏背景图
        screenshots: [], // 游戏截图
      },
      gameTypeArr: [], // 游戏类型
      dialogImageUrl: "", //游戏截图
      dialogVisible: false, // 游戏截图上传组件
      hideUpload: false, // 是否隐藏上传组件
      limit: 12, // 图片上传限制
      loading: true, // 数据加载时的loading
      gmRules: {
        name: [
          { required: true, message: "请输入游戏名称", trigger: "blur" },
          { max: 30, message: "名称长度不能超过30个字符串", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入游戏简介", trigger: "blur" },
          { max: 500, message: "简介长度不能超过500个字符串", trigger: "blur" },
        ],
        downloadCount: [
          { required: true, message: "下载次数不能为空", trigger: "change" },
        ],
        typeIds: [
          { required: true, message: "游戏类型不能为空", trigger: "blur" },
        ],
        cover: [
          { required: true, message: "游戏封面不能为空", trigger: "blur" },
        ],
        backgroundImg: [
          { required: true, message: "游戏背景图不能为空", trigger: "blur" },
        ],
        screenshots: [
          { required: true, message: "游戏截图不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let subObj = {};
          let {
            id,
            name,
            description,
            downloadCount,
            cover,
            backgroundImg,
          } = this.gmRuleForm;
          subObj = {
            id,
            name,
            description,
            downloadCount,
            cover,
            backgroundImg,
          };
          subObj.typeIds = this.gmRuleForm.typeIds.toString();
          let screenshotsArr = [];
          this.gmRuleForm.screenshots.forEach((item) => {
            screenshotsArr.push(item.url);
          });
          subObj.screenshots = screenshotsArr.toString();
          this.$request.fetchAddGame(subObj).then((res) => {
            if (res.data.code === 200) {
              // 清除表单
              this.resetForm(formName);
              if (!this.isedit) {
                this.$message.success("发布成功");
              } else {
                this.$message.success("保存成功");
              }
              // 关闭父组件弹框
              this.$emit("closeBox");
            } else {
              if (!this.isedit) {
                this.$message.error("发布失败");
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
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.gmRuleForm.cover = "";
      this.gmRuleForm.backgroundImg = "";
      this.gmRuleForm.screenshots = [];
    },
    // 清空表单数据方法
    resetData() {
      this.gmRuleForm.id = null; // 游戏id
      this.gmRuleForm.name = ""; // 游戏名称
      this.gmRuleForm.description = ""; // 游戏简介
      this.gmRuleForm.downloadCount = 0; // 下载次数
      this.gmRuleForm.typeIds = null; // 游戏类型
      this.gmRuleForm.cover = "";
      this.gmRuleForm.backgroundImg = "";
      this.gmRuleForm.screenshots = [];
      this.loading = true;
    },
    // 游戏封面上传
    handleAvatarSuccess(res, file) {
      this.gmRuleForm.cover = res.msg;
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
    // 游戏背景上传
    bgHandleAvatarSuccess(res, file) {
      this.gmRuleForm.backgroundImg = res.msg;
      this.bgProgressPercent = 100; // 防止图片上传成后进度条反应不过来
      setTimeout(() => {
        this.progressFlag = false;
      }, 1000);
    },
    uploadFileProcess(event, file, fileList) {
      fileList.forEach((item) => {
        if (item.percentage === 100) {
        } else {
          this.bgProgressFlag = true;
          this.bgProgressPercent = Math.abs(item.percentage.toFixed(0));
        }
      });
    },
    // 游戏截图上传
    handleRemove(file, fileList) {
      //删除,根据uid查找imgs中对应的uid进行删除
      this.gmRuleForm.screenshots.forEach((item, index) => {
        if (item.uid == file.uid) {
          // 删除对应索引的对象
          this.gmRuleForm.screenshots.splice(index, 1);
        }
      });
      this.hideUpload = fileList.length >= this.limit;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 截图上传成功
    handlePictureSuccess(res, file) {
      this.gmRuleForm.screenshots.push({
        uid: file.uid,
        url: res.msg,
      });
    },
    // 当图片上传完成时隐藏上传组件
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limit;
    },
    // 获取游戏类型
    getGameType() {
      this.$request
        .fetchGetGameTypeList({ name: "", page: 1, pageSize: 50 })
        .then((res) => {
          if (res.data.code === 200) {
            this.gameTypeArr = res.data.data.list;
          } else {
            console.log("游戏类型获取失败");
          }
        });
    },
    // 获取游戏详情
    getGameData(id) {
      this.loading = true;
      this.$request.fetchGetGame({ id: id }).then((res) => {
        if (res.data.code === 200) {
          let {
            id,
            name,
            description,
            downloadCount,
            cover,
            backgroundImg,
          } = res.data.data;
          this.gmRuleForm = {
            id,
            name,
            description,
            downloadCount,
            cover,
            backgroundImg,
          };
          // 因为 gmRuleForm 中的 screenshots 需要是对象格式，{uid: number, url: string}
          let directivesArr = [];
          res.data.data.screenshotsList.forEach((item, index) => {
            directivesArr.push({
              uid: index,
              url: item,
            });
          });
          // 截图赋值
          this.gmRuleForm.screenshots = directivesArr;
          // 游戏类型赋值
          let typeIdArr = [];
          res.data.data.typeList.forEach((item, index) => {
            typeIdArr.push(item.id);
          });
          this.gmRuleForm.typeIds = typeIdArr;
        } else {
          this.$message.error("获取数据失败");
        }
        this.loading = false;
      });
    },
  },
  created() {
    this.getGameType();
  },
  watch: {
    'gameid': function (newVal) {
      this.gmRuleForm.id = newVal;
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
  line-height: 150px;
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
  width: 148px;
}
.mt5 {
  margin: 5px;
}
</style>