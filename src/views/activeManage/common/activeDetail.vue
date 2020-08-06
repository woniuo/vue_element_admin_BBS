<template>
  <div>
    <el-card>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-row :span="24">
            <el-col :span="8">
              <el-input v-model="ruleForm.title"></el-input>
            </el-col>
            <el-col :span="4">
              <el-form-item align="left" label="是否启用" prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item align="left" label="排序权重" prop="weight">
                <el-input-number v-model="ruleForm.num" :min="1" label="排序权重"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item align="center">
                <el-button type="primary" @click="submitForm('ruleForm')" v-if="!isEdit">发 布</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-else>保 存</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <template>
          <el-form-item label="类型选择" prop="status" class="z-editor">
            <el-card>
              <el-button type="primary" @click="tabClick('first')">本 链</el-button>
              <el-button type="success" @click="tabClick('second')">外 链</el-button>
            </el-card>
            <el-card>
              <div ref="editor"  :class="ruleForm.type === 1?'show' : 'hidden'"></div>
              <el-input :class="ruleForm.type === 2?'show' : 'hidden'" placeholder="请输入外链地址" v-model="ruleForm.content"></el-input>
            </el-card>
          </el-form-item>
        </template>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "activeDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null, // 保存富文本实例化对象
      activeName: "first",
      ruleForm: {
        title: "", // 标题
        url: "", // 外链地址
        type: 1, // 类型
        content: "", // 主体内容
        status: true, // 状态
        num: 1, // 排序值
        id: "", // 活动公告id - 新增为空
      },
      rules: {
        title: [
          { required: true, message: "请输入发布标题", trigger: "blur" },
          { max: 30, message: "标题长度不能超过30个字符串", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入活动公告摘要", trigger: "blur" },
          { max: 200, message: "摘要长度不能超过200个字符串", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.ruleForm.content) {
          this.$request.fetchAddActive(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              if (!this.isEdit) {
                // 清除表单
                this.resetForm(formName);
                this.$message.success("发布成功");
              } else {
                this.$message.success("保存成功");
              }
            } else {
              if (!this.isEdit) {
                this.$message.error("发布失败");
              } else {
                this.$message.error("保存失败");
              }
            }
          });
        } else {
          this.$message.error("请确保活动公告信息填写完毕")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.cover = "";
      this.editor.txt.clear();
    },
    // tab栏点击切换事件
    tabClick (activeName){
      return  this.$confirm('此操作将不会保存当前填写的内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ruleForm.content = ""
          if (activeName === "first") {
            this.ruleForm.type = 1;
          } else {
            this.ruleForm.type = 2;
          }
        }).catch(() => {
              throw new Error("取消成功！");
        });
    },
    // 获取活动公告详情
    getActiveData(cid) {
      this.$request.fetchGetActive({ id: cid }).then((res) => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.data;
          // 判断是本链还是外链接
          if (res.data.data.type === 1) {
            // 本链
            // 为富文本赋值
            this.activeName = "first";
            this.editor.txt.html(res.data.data.content)
          } else {
            // 切换为外链
            this.activeName = "second";
          }
        } else {
          this.$message.error("数据获取失败");
        }
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
    this.editor.$textContainerElem.css("height", "500px !important"); //设置高度yo
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.query.id) {
          this.ruleForm.id = newVal.query.id;
          this.getActiveData(newVal.query.id);
        }
      },
      immediate: true,
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
.z-editor {
  position: relative;
  z-index: 999;
}
.show {
  display: block;
}
.hidden {
  display: none;
}
</style>