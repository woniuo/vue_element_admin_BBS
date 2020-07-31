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
          <el-col :span="6">
            <el-form-item label="所属游戏" prop="game">
              <el-select v-model="ruleForm.game" placeholder="请选择所属游戏">
                <el-option label="天湖十三浪" value="1"></el-option>
                <el-option label="欢乐斗地主" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="是否置顶" prop="istop">
              <el-switch v-model="ruleForm.istop"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发 布</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="添加标签" prop="tag">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
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
        <el-form-item label="攻略内容" prop="article">
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
      // 标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      // 表达
      ruleForm: {
        title: "",
        game: "",
        istop: false,
        tag: [],
        article: "",
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
        game: [
          { required: true, message: "请选择所属游戏", trigger: "change" },
        ],
        article: [
          { required: true, message: "攻略内容不能为空", trigger: "blur" },
        ],
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
      this.editor.txt.clear()
    },
    // 标签添加
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
        this.$message.error('添加的标签不能为空') 
        return
      } else {
          let istag = this.dynamicTags.some(function (item) {
          // 先判断标签库中是否含有该标签,   有则不添加  反之添加
          return item == inputValue;
        });
        if (!istag) {
          // this.dynamicTags.push({ id: i, name: tag });
          this.dynamicTags.push(inputValue);
        } else {
          this.$message.error("此标签已存在");
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  mounted() {
    let id = this.$route.query.articleId;
    var editor = new E(this.$refs.editor);
    this.editor = editor;
    editor.customConfig.onchange = (html) => {
      this.ruleForm.article = html;
    };
    editor.create();
    this.editor.$textContainerElem.css("height", "500px !important"); //设置高度
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
</style>