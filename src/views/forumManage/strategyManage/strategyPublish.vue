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
        <el-row :span="24">
          <el-col :span="10">
            <el-form-item label="攻略标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="所属游戏" prop="gameId">
              <el-select  v-model="ruleForm.gameId" placeholder="请选择所属游戏">
                <template v-if="gameData && gameData.length>0">
                  <el-option v-for="item in gameData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" align="right">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发 布</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="添加标签" prop="labelIds">
          <el-tag
            :key="tag.id"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag.name}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 标签</el-button>
        </el-form-item>
        <el-form-item label="缩略图" prop="imgPaths">
          <!-- 上传进度条 -->
          <el-upload
            class="avatar-uploader"
            :action="apiUrl+'/upload/uploadFile'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="uploadFileProcess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imgPaths" :src="ruleForm.imgPaths" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="up-desc">说明: 上传图片大小不能超过20M</span>
          <div v-if="progressFlag" class="progress-box">
            <el-progress :percentage="progressPercent"></el-progress>
          </div>
        </el-form-item>
        <el-form-item label="攻略简介" prop="resume">
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          maxlength="200"
          show-word-limit
          placeholder="请输入攻略简介"
          v-model="ruleForm.resume">
        </el-input>
        </el-form-item>
        <el-form-item label="攻略内容" prop="content">
          <div ref="editor"></div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "strategyPublish",
  data() {
    return {
      editor: null, // 保存富文本实例化对象
       progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      dynamicTags: [], // 标签
      inputVisible: false,
      inputValue: "",
      gameData: [], // 所属游戏
      ruleForm: {
        title: "",
        gameId: null,
        imgPaths: "",
        labelIds: "",
        resume: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入攻略标题", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        gameId: [
          { required: true, message: "请选择所属游戏", trigger: "change" },
        ],
        resume: [
          { required: true, message: "请输入攻略简介", trigger: "blur" },
        ],
        content: [
          { required: true, message: "攻略内容不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchAddStrategy(this.ruleForm).then( res => {
            if(res.data.code === 200) {
              this.$message.success("发布成功")
              this.resetForm(formName)
            } else {
              this.$message.error("发布失败")
            }
          })
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
    // 标签删除
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.ruleForm.imgPaths = res.msg;
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
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (!inputValue && !inputValue.match(/^\s+$/)) {
        this.$message.error("添加的标签不能为空");
        return;
      } else {
        let istag = this.dynamicTags.some(function (item) {
          // 先判断标签库中是否含有该标签,   有则不添加  反之添加
          return item.name == inputValue;
        });
        if (!istag) {
          this.$request.fetchAddTag({name: inputValue}).then( res => {
            if(res.data.code === 200) {
              this.dynamicTags.push({
                id: res.data.data.id,
                name: res.data.data.name
              });
              // 对标签进行处理
              let labArr = []
              this.dynamicTags.some(item => {
                labArr.push(item.id)
              })
              this.ruleForm.labelIds = labArr.toString()
            } else {
              this.$message.error("添加失败")
            }
          })
        } else {
          this.$message.error("此标签已存在");
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 获取所属游戏
    getGameList() {
      this.$request
        .fetchGetGameList()
        .then((res) => {
          if (res.data.code === 200) {
            this.gameData = res.data.data.list;
          } else {
            console.log("所属游戏获取失败");
          }
        });
    },
  },
  mounted() {
    let id = this.$route.query.articleId;
    var editor = new E(this.$refs.editor);
    this.editor = editor;
    editor.customConfig.onchange = (html) => {
      this.ruleForm.content = html;
    };
    editor.create();
    this.editor.$textContainerElem.css("height", "500px !important"); //设置高度
    // 获取所属游戏
    this.getGameList({ page: 1, pageSize: 50, gameName: "" })
  },
  watch: {
    //监听标签的长度,判断是否超出最大范围
    inputValue: function (newval) {
      var that = this;
      if (newval.match(/^\s+$/)) {
        this.$message.warning("标签不能为空");
      }
      if (newval.length > 10) {
        this.$message.warning("标签最大不能超过10个字");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
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