<template>
  <div>
    <el-card class="hide-relative">
      <div v-if="loading" class="hide-loading loading">
        <span class="el-icon-loading"></span>玩命加载中....
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-row :span="24">
            <el-col :span="12">
              <el-input v-model="ruleForm.title" :disabled="disabled"></el-input>
            </el-col>
            <el-col :span="12" v-if="!type">
              <el-form-item align="center">
                <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="简介" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.remark"
            maxlength="200"
            show-word-limit
            :disabled="disabled"
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
            :disabled="disabled"
          >
            <img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar" />
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
  name: "news",
  props: {
    nid: Number,
  },
  data() {
    return {
      editor: null, // 保存富文本实例化对象
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      emptyText: "加载中...",
      loading: false,
      type: true, // 类型
      disabled: false, // 表达禁用状态
      ruleForm: {
        title: "", // 标题
        remark: "", // 简介
        cover: "", // 缩略图
        content: "", // 主体内容
        id: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入发布标题", trigger: "blur" },
          { max: 30, message: "标题长度不能超过30个字符串", trigger: "blur" },
        ],
        radio: [{ required: true, message: "" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchAddNews(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              // 清除表单
              this.resetForm(formName);
              this.$message.success("修改成功");
              // 关闭弹框
              this.$emit("colseCallBack")
            } else {
              this.$message.error("修改失败");
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
      this.ruleForm.cover = "";
      this.editor.txt.clear();
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
    // 获取公共详情
    getNews(isFalg, nid) {
      this.loading = true;
      this.type = isFalg;
      this.$request.fetchGetNewsData({ id: nid }).then((res) => {
        if (res.data.code === 200) {
          let { title, remark, cover, id, content } = res.data.data;
          this.ruleForm = { title, remark, cover, id, content };
          // 初始化富文本内容
          this.editor.txt.html(content);
          // 判断如果是查看则禁用富文本
          if (isFalg) {
            this.editor.$textElem.attr("contenteditable", false);
            this.disabled = true;
          } else {
            this.editor.$textElem.attr("contenteditable", true);
            this.disabled = false;
          }
        } else {
          this.$message.error("数据加载失败");
        }
        this.emptyText = "暂无数据";
        this.loading = false;
      });
    },
  },
  mounted() {
    let id = this.$route.query.articleId;
    var editor = new E(this.$refs.editor);
    this.editor = editor;
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = this.apiUrl + "/upload/editorUpload";
    //自定义文件名
    editor.customConfig.uploadFileName = "file";
    editor.customConfig.onchange = (html) => {
      this.ruleForm.content = html;
    };
    editor.create();
    this.editor.$textContainerElem.css("height", "500px !important"); //设置高度
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
.loading > span {
  font-size: 28px;
}
</style>