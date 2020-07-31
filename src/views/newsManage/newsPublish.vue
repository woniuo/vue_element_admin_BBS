<template>
  <div>
    <el-card>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-row :span="24">
            <el-col :span="12">
              <el-input v-model="ruleForm.title"></el-input>
            </el-col>
            <el-col :span="12">
              <el-row :span="24">
                <el-col :span="12">
                  <el-form-item  label="状态" prop="radio">
                    <el-switch
                      v-model="ruleForm.radio"
                      active-color="#13ce66"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item align="center">
                    <el-button type="primary" @click="submitForm('ruleForm')">发 布</el-button>
                    <el-button @click="resetForm('ruleForm')">重 置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="简介" prop="synopsis">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.synopsis"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="thumbnail">
          <!-- 上传进度条 -->
          <el-upload
            class="avatar-uploader"
            :action="apiUrl+'/upload/uploadFile'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="uploadFileProcess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="up-desc">说明: 上传图片大小不能超过20M</span>
          <div v-if="progressFlag" class="progress-box">
            <el-progress :percentage="progressPercent"></el-progress>
          </div>
        </el-form-item>
        <el-form-item label="主体内容" prop="content">
          <div ref="editor"></div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "newsPublish",
  data() {
    return {
      editor: null, // 保存富文本实例化对象
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      emptyText: "加载中...",
      ruleForm: {
        title: "", // 标题
        synopsis: "", // 简介
        imageUrl: "", // 缩略图
        content: "", // 主体内容
        radio: true, // 新闻状态- 默认开启
      },
      rules: {
        title: [
          { required: true, message: "请输入发布标题", trigger: "blur" },
          { max: 20, message: "标题长度不能超过20个字符串", trigger: "blur" },
        ],
        radio: [{ required: true, message: "" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editor.txt.clear();
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = res.msg;
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
        console.log(item.percentage);
        if (item.percentage === 100) {
        } else {
          this.progressFlag = true;
          this.progressPercent = Math.abs(item.percentage.toFixed(0));
        }
      });
    }
  },
  mounted() {
    let id = this.$route.query.articleId;
    var editor = new E(this.$refs.editor);
    this.editor = editor;
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = this.apiUrl + "/upload/uploadFile";
    //自定义文件名
    editor.customConfig.uploadFileName = "file";
    editor.customConfig.onchange = (html) => {
      this.ruleForm.content = html;
    };
    editor.create();
    this.editor.$textContainerElem.css("height", "500px !important"); //设置高度yo
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
.el-dialog__wrapper {
  z-index: 10002 !important;
}
.v-modal {
  z-index: 10003 !important;
}
.el-select-dropdown {
  z-index: 10003 !important;
}
.progress-box {
  width: 200px;
}
</style>