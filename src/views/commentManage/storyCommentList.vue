<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="评论查询">
                <el-input v-model="searchPage.searchText" placeholder="请输入评论人昵称查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </el-card>
      <el-table :data="tableData" style="width: 100%" :empty-text="emptyText">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-card>
                <el-row :span="24">
                  <el-col :span="24">
                    <el-row>
                      <el-col>评论内容:</el-col>
                      <el-col class="cmbg">{{props.row.content}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="24">
                    <template v-if="props.row.imgPath && props.row.imgPath.length>0">
                      <el-row>
                        <el-col>评论图片:</el-col>
                        <el-col class="cmbg">
                          <el-image
                            v-for="imgUrl in props.row.imgPath"
                            :key="imgUrl"
                            class="commentImg"
                            :src="imgUrl"
                            :preview-src-list="props.row.imgPath"
                          ></el-image>
                        </el-col>
                      </el-row>
                    </template>
                  </el-col>
                </el-row>
              </el-card>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="评论ID" prop="id" align="center" width="50"></el-table-column>
        <el-table-column label="攻略标题" prop="title" align="center">
          <template slot-scope="scope">
            <div class="out-dot">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="评论人" prop="nickname" align="center" width="200"></el-table-column>
        <el-table-column label="评论内容" prop="content" align="center" width="200">
          <template slot-scope="scope">
            <div class="out-dot">{{scope.row.content}}</div>
          </template>
        </el-table-column>
        <el-table-column label="顶数" prop="upCount" sortable width="150" align="center">
          <template slot-scope="scope">
            <el-tag disable-transitions>
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              {{scope.row.upCount}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="踩数" prop="stepCount" sortable width="150" align="center">
          <template slot-scope="scope">
            <el-tag disable-transitions>
              <i class="fa fa-hand-o-down" aria-hidden="true"></i>
              {{scope.row.stepCount}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评论时间" prop="createTime" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row :span="24">
              <el-col :span="12">
                <el-button
                  v-if="scope.row.replyCount !== 0"
                  size="mini"
                  @click="lookComment(scope.$index, scope.row)"
                >
                  <i class="fa fa-eye" aria-hidden="true"></i>查看回复
                </el-button>
                <div v-else style="height:28px"></div>
              </el-col>
              <el-col :span="12" class="text-left">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)"
                >
                  <i class="el-icon-delete"></i>删除
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <el-card>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="searchPage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </el-card>
    </template>
    <!-- 回复评论 -->
    <Comment
      :dialogVisible="dialogVisibleCmt"
      :bcommentName="bcommentName"
      :cmtType="cmtType"
      ref="comment"
      @cmtCallback="cmtCallback"
    ></Comment>
  </div>
</template>

<script>
import Comment from "../../components/comment/comment";
export default {
  name: "storyCommentList",
  components: {
    Comment,
  },
  data() {
    return {
      dialogVisibleCmt: false,
      bcommentName: "", // 被评论人昵称
      radio: 1, // 审核状态
      visibleList: [], // 初始化为一个空数组
      tableData: [],
      emptyText: "加载中...",
      searchPage: {
        // 翻页
        userId: "",
        page: 1,
        pageSize: 10,
        searchText: "",
        cmtLevel: 1,
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      cmtType: 2, // 评论类型
    };
  },
  methods: {
    // 显示回复评论
    lookComment(index, data) {
      this.dialogVisibleCmt = true;
      this.bcommentName = data.nickname;
      this.$refs.comment.getComment(2, data);
    },
    cmtCallback() {
      this.dialogVisibleCmt = false;
    },
    // 删除
    handleDelete(index, id) {
      this.$request
        .fetchDelStoryComment({ storyCommentId: id })
        .then((res) => {
          if (res.data.code === 200) {
            // 移除索引对应的那条数据
            this.tableData.splice(index, 1);
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        });
    },
    // 分页
    handleSizeChange(val) {
      this.searchPage.pageSize = val;
      this.getList(this.searchPage);
    },
    handleCurrentChange(val) {
      this.searchPage.page = val;
      this.getList(this.searchPage);
    },
    // 评论查询
    onSubmit() {
      this.getList(this.searchPage);
    },
    // 获取列表
    getList(data) {
      this.$request.fetchGetStoryCommentList(data).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.searchPage.page = res.data.data.currPage;
          this.totalCount = res.data.data.totalCount;
          this.totalPage = res.data.data.totalPage;
        } else {
          this.$message.error("数据获取失败");
        }
        this.emptyText = "暂无数据";
      });
    },
  },
  mounted() {
    this.getList(this.searchPage);
  },
  watch: {
    "searchPage.searchText": {
      handler(newVal) {
        if (newVal.length === 0) {
          this.searchPage.page = 1;
          this.getList(this.searchPage);
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.name-wrapper > span {
  cursor: pointer;
}
.mt10 {
  margin-top: 10px;
}
.out-dot {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.commentImg {
  width: 80px;
  height: 80px;
  margin: 5px 5px;
}
.cmbg {
  margin: 10px auto;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 10px;
}
.text-left {
  text-align: left;
}
</style>