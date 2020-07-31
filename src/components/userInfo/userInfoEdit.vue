<template>
  <el-dialog
    title="用户信息修改"
    :visible.sync="visible"
    width="600px"
    destroy-on-close
    @close="closeCallback"
  >
    <div v-if="loading" class="loading">
      <span class="el-icon-loading"></span>加载中....
    </div>
    <template v-else>
      <el-form :model="userInfo" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="userInfo.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker v-model="userInfo.birth" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduce">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            maxlength="50"
            show-word-limit
            v-model="userInfo.introduce"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="userInfo.mail"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="headImg">
           <el-card>
          <el-row :span="24">
            <el-col :span="12">
             
                <el-image style="width:148px;height:148px" v-if="userInfo.headImg" :src="userInfo.headImg" fit="cover"></el-image>
             
            </el-col>
            <el-col :span="12">
              <el-upload
                :action="apiUrl+'/upload/uploadFile'"
                list-type="picture-card"
                :show-file-list="false"
                :on-change="cmtUpChange"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                >
                <i  class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </el-row>
           </el-card>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: "userInfoShow",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 用户信息
      userId: '', // 用户id
      userInfo: {
        headImg: "", // 头像
        nickname: "", // 昵称
        gender: 1, // 性别
        birth: "", // 生日
        introduce: "", // 签名
        mail: "" // 邮箱
      },
      updialogImageUrl: '',
      updialogVisible: false,
      hideUpload: false, // 是否隐藏上传组件
      visible: this.dialogVisible,
      loading: false,
      rules: {
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { max: 10, message: "长度最大为10个字符串", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择用户性别", trigger: "change" }],
        birth: [
          { required: true, message: "请选择用户生日", trigger: "change" }
        ],
        introduce: [{ max: 50, message: "长度最大为50个字符串", trigger: "blur" }],
        mail: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        headImg: [{ required: true, message: "请上传用户头像", trigger: "change" },],
      }
    };
  },
  methods: {
    // 获取用信息
    getUserInfo(id) {
      this.userId = id // 存储用户id
      let _this = this;
      this.loading = true;
      this.$request.fetchGetUserInfoW({ id: id }).then(function(response) {
        if (response.data.code == 200) {
          let {headImg, nickname, gender, birth, introduce, mail} = response.data.data
          _this.userInfo = {headImg, nickname, gender, birth, introduce, mail}
          _this.loading = false;
        }
      });
    },
    closeCallback() {
      this.$emit("editCallback");
    },
    submitForm(ruleForm) {
      let _this = this
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          _this.userInfo.id = _this.userId
          _this.$request.fetchUpUserInfo(_this.userInfo)
          .then(res => {
            if(res.data.code === 200) {
              _this.$message.success('修改成功')
              // 再次调用关闭方法
              _this.closeCallback()
            } else {
              _this.$message.error('修改失败')
            }
          })
        } else {
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
        this.hideUpload = false
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
        this.updialogImageUrl = file.url;
        this.updialogVisible = true;
      },
    handleAvatarSuccess(res, file) {
			this.userInfo.headImg = res.msg
    },
    //当图片上传完成时隐藏上传组件
		cmtUpChange(file, fileList){
      this.hideUpload = fileList.length >= 1
		},
  },
  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible
    }
  },
  mounted() {
    
  }
}
</script>
<style>
.loading {
  text-align: center;
}
.loading > span {
  font-size: 22px;
}
/* element上传组件 */
.hide_up .el-upload--picture-card {
	display: none;
}
</style>