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
              <el-input
                v-model="ruleForm.title"
                minlength="1"
                maxlength="20"
                show-word-limit
                :disabled="disabled"
              ></el-input>
            </el-col>
            <el-col :span="12" v-if="isedit === true || isadd === true">
              <el-row :span="24">
                <el-col :span="10">
                  <el-form-item label="接收对象" prop="isAll" v-if="isadd === true">
                    <el-radio-group v-model="ruleForm.isAll">
                      <el-radio :label="1">所有人</el-radio>
                      <el-radio :label="2" @change="getUserList">自定义</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="状态" prop="status">
                    <el-switch v-model="ruleForm.status" active-color="#13ce66"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item align="center">
                    <el-button
                      type="primary"
                      @click="submitForm('ruleForm')"
                      v-if="isedit !== true"
                    >发 布</el-button>
                    <el-button type="primary" @click="editForm('ruleForm')" v-else>保 存</el-button>
                    <el-button @click="resetForm('ruleForm')">重 置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="简介" prop="resume">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.resume"
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
            <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar" />
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
    <template>
      <el-dialog title="选择发送对象" :visible.sync="dialogTableVisible">
        <el-row :span="24">
          <el-col :span="12">
            <el-row :span="24">
              <el-col :span="16">
                <el-input v-model="searchPage.phone" placeholder="请输入手机号码查询"></el-input>
              </el-col>
              <el-col :span="8" align="center">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" align="right" v-if="multipleSelection.length>0">
            <el-button type="primary" @click="getUserIdArr">确 定</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="userListData"
          @selection-change="handleSelectionChange"
          :empty-text="emptyText"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column property="id" label="ID" width="150"></el-table-column>
          <el-table-column property="phone" label="手机号" align="center"></el-table-column>
          <el-table-column property="nickname" label="昵称" align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="searchPage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "announcement",
  props: {
    isedit: {
      type: Boolean,
      default: false,
    },
    isadd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null, // 保存富文本实例化对象
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      dialogTableVisible: false,
      userListData: [], // 用户列表数据
      multipleSelection: [], // 用户选中的用户
      emptyText: "加载中...",
      loading: false,
      // 翻页搜索
      searchPage: {
        gender: "",
        page: 1,
        pageSize: 10,
        phone: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      ruleForm: {
        title: "", // 标题
        resume: "", // 简介
        imgUrl: "", // 缩略图
        content: "", // 主体内容
        userIds: [], // 接收对象id
        isAll: 1, // 是否选择所有人接收
        status: true, // 状态
      },
      rules: {
        title: [
          { required: true, message: "请输入发布标题", trigger: "blur" },
          { max: 20, message: "标题长度不能超过20个字符串", trigger: "blur" },
        ],
        isAll: [
          { required: true, message: "接收人必须勾选", trigger: "change" },
        ],
        resume: [
          { required: true, message: "请输入公告简介", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入主体内容", trigger: "blur" },
        ],
      },
      disabled: false, // 是否禁用
    };
  },
  methods: {
    // 发布公告
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchAddNotice(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("发布成功");
              this.resetForm(formName);
            } else {
              this.$message.error("发布失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改公告
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchEditNotice(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("保存成功");
            } else {
              this.$message.error("保存失败");
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.imgUrl = "";
      this.editor.txt.clear();
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.imgUrl = res.msg;
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
    // 获取用户列表
    getUserList(data) {
      this.dialogTableVisible = true;
      this.$request.fetchGetUserList(data).then((res) => {
        if (res.data.code === 200) {
          this.userListData = res.data.data.list;
          this.searchPage.page = res.data.data.currPage;
          this.totalCount = res.data.data.totalCount;
          this.totalPage = res.data.data.totalPage;
        } else {
          this.$message.error("数据加载失败");
        }
        this.emptyText = "暂无数据";
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.searchPage.pageSize = val;
      this.getUserList(this.searchPage);
    },
    handleCurrentChange(val) {
      this.searchPage.page = val;
      this.getUserList(this.searchPage);
    },
    // 将用户id提取出来
    getUserIdArr() {
      this.multipleSelection.forEach((item) => {
        this.ruleForm.userIds.push(item.id);
      });
      this.dialogTableVisible = false;
    },
    // 用户查询
    onSubmit() {
      this.getUserList(this.searchPage);
    },
    // 获取公共详情 isEdit: true 编辑, false 查看
    getNotice(isEdit, nid) {
      this.loading = true;
      this.$request.fetchGetNoticeData({ id: nid }).then((res) => {
        if (res.data.code === 200) {
          let { id, title, imgUrl, resume, content, status } = res.data.data;
          this.ruleForm = { id, title, imgUrl, resume, content, status };
          // 初始化富文本内容
          this.editor.txt.html(content);
          // 判断如果是查看则禁用富文本
          if (isEdit) {
            this.editor.$textElem.attr("contenteditable", true);
            this.disabled = false;
          } else {
            this.editor.$textElem.attr("contenteditable", false);
            this.disabled = true;
          }
        } else if (res.data.code === 500) {
          // 返回上一级
          this.$router.go(-1);
        } else {
          this.$message.error("数据加载失败");
        }
        this.emptyText = "暂无数据";
        this.loading = false;
      });
    },
  },
  watch: {
    "searchPage.phone": {
      handler(newVal) {
        if (newVal.length === 0) {
          this.searchPage.page = 1;
          this.getUserList(this.searchPage);
        }
      },
    },
    "$route": {
      handler(newVal) {
        if (newVal) {
          this.getNotice(true, this.$route.query.id);
        }
      },
      deep: true,
    },
  },
  mounted() {
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

    if (this.isedit) {
      this.getNotice(true, this.$route.query.id);
    }
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