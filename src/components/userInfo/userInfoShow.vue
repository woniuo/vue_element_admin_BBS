<template>
  <el-dialog
    title="用户信息"
    :visible.sync="visible"
    width="600px"
    destroy-on-close
    @close="closeCallback"
  >
    <div v-if="loading" class="loading">
      <span class="el-icon-loading"></span>加载中....
    </div>
    <template v-else>
      <el-row :span="24">
        <el-col :span="24" class="inner-center">
          <el-image
            v-if="userInfo.headImg"
            :src="userInfo.headImg"
            fit="cover"
            class="avatar"
          ></el-image>
          <i v-else class="fa fa-user-circle fa-4x" aria-hidden="true"></i>
        </el-col>
      </el-row>
      <el-row class="user-list" :span="24">
        <el-col :span="12" class="user-list-left">
          <el-row class="lists">
            <el-col>
              <span class="left-title">昵称: </span>
              {{userInfo.nickname}}
            </el-col>
            <el-col>
              <span class="left-title">用户名: </span>
              {{userInfo.phone}}
            </el-col>
            <el-col>
              <span class="left-title">性别: </span>
              <span v-if="userInfo.sex === 1">男</span>
              <span v-else-if="userInfo.sex === 2">女</span>
              <span v-else>保密</span>
            </el-col>
            <el-col>
              <span class="left-title">生日: </span>
              {{userInfo.birth}}
            </el-col>
            <el-col>
              <span class="left-title">个人介绍: </span>
              {{userInfo.introduce}}
            </el-col>
            <el-col>
              <span class="left-title">邮箱: </span>
              {{userInfo.mail}}
            </el-col>
            <el-col>
              <span class="left-title">积分: </span>
              {{userInfo.integral}}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" class="user-list-right">
          <el-row class="lists">
              <el-col>
                <span class="left-title">等级: </span>
                {{userInfo.level}}
            </el-col>
            <el-col class="title-show">
                <span class="left-title">头衔: </span>
                <el-image class="title" :src="userInfo.rank.imgUrl" fit="cover"></el-image>
            </el-col>
            <el-col>
                <span class="left-title">关注: </span>
                {{userInfo.subscriptions}}
            </el-col>
            <el-col>
                <span class="left-title">粉丝: </span>
                {{userInfo.fans}}
            </el-col>
            <el-col>
                <span class="left-title">攻略: </span>
                {{userInfo.strategyNum}}
            </el-col>
            <el-col>
                <span class="left-title">故事: </span>
                {{userInfo.storyNum}}
            </el-col>
            <el-col>
                <span class="left-title">动态: </span>
                {{userInfo.photoNum}}
            </el-col>
          </el-row>
        </el-col>
      </el-row>
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
      userInfo: {
        headImg: "", // 头像
        nickname: "", // 昵称
        phone: "", // 手机号
        sex: 1, // 性别
        birth: "", // 生日
        introduce: "", // 签名
        mail: "", // 邮箱
        level: 0, // 等级
        rank: {
        name: "布衣",
        imgUrl: ""
        }, // 头衔
        subscriptions: 0, // 关注数
        fans: 0, // 粉丝数
        integral: 0, // 积分
        strategyNum: 0, // 攻略数
        storyNum: 0, // 故事数
        photoNum: 0 // 动态数
      },
      visible: this.dialogVisible,
      loading: false
    };
  },
  methods: {
    // 获取用信息
    getUserInfo(id) {
      let that = this;
      this.loading = true;
      this.$request.fetchGetUserInfoW({id: id}).then(function(response) {
        if (response.data.code == 200) {
          that.userInfo = response.data.data;
          that.loading = false;
        }
      });
    },
    closeCallback() {
      this.$emit("successCallback");
    }
  },
  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.inner-center {
  display: flex;
  justify-content: center;
}
.user-list{
    margin-top: 20px;
}
.lists > div{
    margin: 10px auto;
}
.avatar {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.title {
    width: 100px;
    position: absolute;
    margin-left: 10px;
    top: -5px;
}
.title-show {
    position: relative;
}
.left-title {
    color: #999999;
}
.user-list-left, .user-list-right {
    padding-left: 50px;
}
.user-list-left {
    border-right: 2px dashed #eeeeee;
}
.loading {
  text-align: center;
}
.loading > span {
  font-size: 22px;
}
</style>