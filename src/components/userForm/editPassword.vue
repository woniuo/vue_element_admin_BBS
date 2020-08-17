<template>
  <el-dialog title="修改密码" width="580px" :visible.sync="visible" destroy-on-close @close="closeCallback">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <!-- <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm2.oldPassword" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
import Cookies from "js-cookie"
export default {
  name: "editPassword",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if (value.toString().length < 6) {
        callback(new Error("密码长度不能低于6位"))
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
      } else if (value.toString().length < 6) {
        callback(new Error("密码长度不能低于6位"))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      visible: this.dialogVisible,
      ruleForm2: {
        oldPassword: "",
        password: "",
        checkPass: ""
      },
      rules2: {
        oldPassword: [
          {required: true, validator: validatePass, trigger: "blur"}
        ],
        password: [
          {required: true, validator: validatePass, trigger: "blur"}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    closeCallback () {
      this.$emit("editPwdCallback")
    },
    submitForm (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchEditPassword({
            password: that.ruleForm2.password
          }).then((res) => {
             if (res.data.code === 200) {
              that.$message.success("修改成功")
              setTimeout(function () {
                Cookies.remove("access_token")
                location.reload()
              }, 3000)
             } else {
               that.$message.error("修改失败")
             }
          }).catch((err) => {
            that.$message({
              showClose: true,
              message: err.data.message,
              type: "error"
            })
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .demo-ruleForm {
    width: 460px;
    padding-top: 25px;
  }

  .card {
    width: 560px;
    padding-bottom: 15px;
    margin: 0px auto;
  }
</style>
