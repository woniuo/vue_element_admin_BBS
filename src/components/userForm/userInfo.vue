<template>
  <el-dialog :title="title" width="600px" :visible.sync="visible" destroy-on-close @close="closeCallback">
    <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm2.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="!userId" label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="!userId" label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-if="roleName" v-model="ruleForm2.roleId" disabled  placeholder="请选择等级">
          <el-option
            v-for="item in roleData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-else v-model="ruleForm2.roleId"  placeholder="请选择等级">
          <el-option
            v-for="item in roleData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm2.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像上传">
        <!-- 上传进度条 -->
          <el-upload
            class="avatar-uploader"
            :action="apiUrl+'/upload/uploadFile'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="uploadFileProcess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm2.avatar" :src="ruleForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="up-desc">说明: 上传图片大小不能超过20M</span>
          <div v-if="progressFlag" class="progress-box">
            <el-progress :percentage="progressPercent"></el-progress>
          </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
        <el-button @click="resetForm('ruleForm2')">重 置</el-button>
      </el-form-item>
    </el-form>
<!--    </div>-->
  </el-dialog>
</template>

<script>
export default {
  name: "userInfo",
  props: {
    title: {
      type: String,
      default: "账号信息"
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: null
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass")
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      roleName: false,
      roleData: [],
      visible: this.dialogVisible,
      ruleForm2: {
        avatar: "",
        email: "",
        password: "",
        checkPass: "",
        roleId: null,
        phone: "",
        username: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        password: [
          {required: true, validator: validatePass, trigger: "blur"}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: "blur"}
        ],
        roleId: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ]
      }
    }
  },
  methods: {
    closeCallback () {
      this.$emit("successCallback")
    },
    getList () {
      let that = this
      this.$request.fetchGetRoleList().then(function (response) {
        that.roleData = response.data.data
        let userId = that.userId
        if (!userId) {
          return false
        }
        that.$request.fetchGetUserInfoId({id: userId})
          .then(function (res) {
            console.log(res)
            res.data.password = ""
            if (res.data.status === "1") {
              res.data.status = true
            } else {
              res.data.status = false
            }

            that.ruleForm2 = res.data
            that.roleName = true
            for (let i = 0; i < that.roleData.length; i++) {
              if (that.$store.getters.info.role === "超级管理员" && that.$store.getters.info.uid !== userId) {
                that.roleName = false
              }
            }
            return false
          })
          .catch(function (error) {
            console.log(error)
          })
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitForm (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = {}
          let fetchFn = this.$request.fetchEditUser
          if (!that.userId) {
            for (let item in that.ruleForm2) {
              if (item !== "checkPass") {
                newData[item] = that.ruleForm2[item]
              }
            }
            fetchFn = this.$request.fetchRegister
          } else {
            for (let item in that.ruleForm2) {
              if (item !== "password" && item !== "checkPass") {
                newData[item] = that.ruleForm2[item]
              }
            }
          }
          console.log(newData)
          return
          fetchFn(newData).then((res) => {
            that.$message({
              showClose: true,
              message: res.data.message,
              type: "success"
            })
            that.visible = false
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.ruleForm2.avatar = res.msg;
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
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style scoped>
  .demo-ruleForm {
    width: 460px;
    padding-top: 25px;
  }
  .el-select {
    width: 100%;
  }
  .card {
    width: 560px;
    padding-bottom: 15px;
    margin: 0px auto;
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