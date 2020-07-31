<template>
  <el-dialog
    :title="'回复' + bName"
    :visible.sync="visible"
    width="600"
    destroy-on-close
    :before-close="closeCallback"
  >
    <div v-if="loading" class="loading">
      <span class="el-icon-loading"></span>加载中....
    </div>
    <div v-else id="box" class="cmt_infinite-list-wrapper">
      <div class="box" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <ul class="list">
          <li v-for="(item,index) in commentList" class="cmt_list-item" :key="index">
            <el-row :span="24">
              <el-col :span="20">
                <el-row :span="24">
                  <el-col :span="12" class="cmt_nickname">{{ item.nickname }} :</el-col>
                  <el-col :span="12" class="cmt_in-left">{{ item.createTime}}</el-col>
                </el-row>
                <el-row :span="24" v-if="item.beNickname !== bcommentName">
                  <el-col class="cmt_be-nickname">
                    回复
                    <span>{{ item.beNickname }}</span>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col class="cmt_content" :span="24">{{item.content}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="4" class="cmt_in-center">
                <el-button type="danger" size="mini" @click="delComment(index, item.id)">删除</el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
        <div class="cmt_loading cmt_in-center" v-if="cmtLoading">
          <span class="el-icon-loading"></span> 加载中...
        </div>
        <div v-if="noMore" class="cmt_no-more cmt_in-center">没有更多了</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "comment",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    bcommentName: String,
    cmtType: Number,
  },
  data() {
    return {
      visible: this.dialogVisible,
      bName: "",
      count: 0, //起始页数值为0
      loading: false,
      isLoading: true, // 弹框初始化的加载
      cmtLoading: false,
      totalPages: "", // 取后端返回内容的总页数
      commentList: [], // 回复评论数据
      cmtPage: {
        page: 1,
        pageSize: 10,
        cmtLevel: 2,
        parentId: null,
      },
    };
  },
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.count >= this.totalPages - 1;
    },
    disabled() {
      return this.cmtLoading || this.noMore;
    },
  },
  methods: {
    closeCallback() {
      this.isLoading = true;
      this.$emit("cmtCallback");
    },
    load() {
      //滑到底部时进行加载
      this.cmtLoading = true;
      this.count += 1; //页数+1
      this.getComment({
        page: this.count,
        pageSize: 10,
      }); //调用接口，此时页数+1，查询下一页数据
    },
    // 获取回复评论
    getComment(cmtType, data) {
      this.commentList = []; // 每次都需要清除数据
      this.visible = this.dialogVisible; // 避免监听失效导致弹出框没有渲染
      if (this.isLoading) {
        this.loading = true;
      }
      this.cmtPage.parentId = data.id;
      if (cmtType === 1) {
        this.$request.fetchGetStrategyCommentList(this.cmtPage).then((res) => {
          if (res.data.code === 200) {
            this.commentList = this.commentList.concat(res.data.data.list);
            this.totalPages = res.data.data.totalPage;
            this.cmtLoading = false;
            this.loading = false;
            this.isLoading = false;
          } else {
            this.$message.error("数据获取失败");
          }
        });
      }
      // 故事
      if (cmtType === 2) {
        this.$request.fetchGetStoryCommentList(this.cmtPage).then((res) => {
          if (res.data.code === 200) {
            this.commentList = this.commentList.concat(res.data.data.list);
            this.totalPages = res.data.data.totalPage;
            this.cmtLoading = false;
            this.loading = false;
            this.isLoading = false;
          } else {
            this.$message.error("数据获取失败");
          }
        });
      }
      // 动态
      if (cmtType === 3) {
        this.$request.fetchGetDynamicCommentList(this.cmtPage).then((res) => {
          if (res.data.code === 200) {
            this.commentList = this.commentList.concat(res.data.data.list);
            this.totalPages = res.data.data.totalPage;
            this.cmtLoading = false;
            this.loading = false;
            this.isLoading = false;
          } else {
            this.$message.error("数据获取失败");
          }
        });
      }
    },
    // 删除回复评论
    delComment(index, id) {
      // 攻略
      if (this.cmtType === 1) {
        this.$request
          .fetchDelStrategyComment({ strategyCommentId: id })
          .then((res) => {
            if (res.data.code === 200) {
              // 移除当前索引评论
              this.commentList.splice(index, 1);
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除成功");
            }
          });
      }
      // 故事
      if (this.cmtType === 2) {
        this.$request
          .fetchDelStoryComment({ storyCommentId: id })
          .then((res) => {
            if (res.data.code === 200) {
              // 移除当前索引评论
              this.commentList.splice(index, 1);
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除成功");
            }
          });
      }
      // 动态
      if (this.cmtType === 3) {
        this.$request
          .fetchDelDynamicComment({ photoCommentId: id })
          .then((res) => {
            if (res.data.code === 200) {
              // 移除当前索引评论
              this.commentList.splice(index, 1);
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除成功");
            }
          });
      }
    },
  },
  watch: {
    dialogVisible: {
      handler() {
        this.visible = this.dialogVisible;
      },
      deep: true,
    },
    bcommentName() {
      this.bName = this.bcommentName;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
}
.loading > span {
  font-size: 22px;
}
.cmt_infinite-list-wrapper {
  overflow: auto;
  height: 450px;
}
.cmt_list-item {
  border-bottom: 1px solid #eee;
  padding: 5px;
  margin: 10px auto;
}
.cmt_content {
  padding: 10px;
  border-radius: 5px;
  background-color: #eeeeee;
  margin-top: 10px;
}
.cmt_in-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cmt_in-left {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cmt_nickname {
  color: #333333;
}
.cmt_be-nickname {
  color: #999999;
  span {
    color: #333333;
  }
}
</style>