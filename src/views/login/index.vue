<template>
  <div class="login-container">
    <img class="logo" src="../../assets/login/logo.png" alt="岂会玩logo">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">岂会玩吧后台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <span class="iconfont icon-yonghu"></span>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <span class="iconfont icon-mima"></span>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密 码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <span class="iconfont" :class="passwordType === 'password' ? 'icon-yincangmima' : 'icon-xianshi_huaban'"></span>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" class="login" @click.native.prevent="handleLogin">登录</el-button>

      <div style="margin-top:15px">
        <el-link href="javascript:void(0);" target="_blank" class="forget-password">忘记密码?</el-link>
      </div>
    </el-form>
    <p class="copy-right">Copyright © 2020 江西优服科技有限公司</p>
    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("用户名不能为空"))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码不能少于4位"))
      } else {
        callback()
      }
    }
    return {
      smdl: true,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  methods: {
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= "A" && key <= "Z")
    },
    showPwd () {
      if (this.passwordType === "password") {
        this.passwordType = ""
      } else {
        this.passwordType = "password"
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      let that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$request.fetchLogin({
            username: that.loginForm.username,
            password: that.loginForm.password
          }).then(res => {
            if (res.data.code === 200) {
              that.$restBack(res.data, () => {
                that.$store.dispatch("setToken", res.data.data.accessToken).then(res => {
                  that.$router.push({path: "/"})
                  this.loading = false
                })
              }, "登录成功")
            } else {
              this.$message.error({
                message: res.data.msg
              })
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted () {
    sessionStorage.removeItem("addTab")
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .logo{
    width: 100px;
    position: absolute;
    top: 30px;
    left: 30px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .copy-right{
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    width: 300px;
    text-align: center;
  }
}
@media only screen and (min-width: 100px) and (max-width: 1025px){
  .login-container {
    .logo{
        top: 20px;
        left: 10px;
        width: 150px;
      }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 200px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
     .login{
      background-color: #ffc53b;
      border: 1px solid #ffc53b;
      width: 100%;
      color: #fff;
    }
    .login:hover{
      background-color: #ffd249;
    }
    .forget-password{
      color: #409EFF;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    box-sizing: border-box;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
