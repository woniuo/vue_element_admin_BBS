<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="反馈查询">
                <el-input v-model="searchPage.nickname" placeholder="请输入反馈人昵称查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right" v-if="multipleSelection.length>0">
            <el-button type="primary" @click="setStatusAll(1)">批量已阅</el-button>
            <el-button type="danger" @click="delStatusAll">批量删除</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :empty-text="emptyText"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-card>
              <el-row :span="24">
                <el-col :span="24">
                  <el-row>
                    <el-col>反馈内容:</el-col>
                    <el-col class="cmbg">{{props.row.desb}}</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :span="24">
                <el-col :span="24">
                  <template v-if="props.row.imgUrl && props.row.imgUrl.length>0">
                    <el-row>
                      <el-col>问题图片:</el-col>
                      <el-col class="cmbg">
                        <el-image
                          v-for="imgUrl in props.row.imgUrl"
                          :key="imgUrl"
                          class="commentImg"
                          :src="imgUrl"
                          :preview-src-list="props.row.imgUrl"
                        ></el-image>
                      </el-col>
                    </el-row>
                  </template>
                </el-col>
              </el-row>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="80" align="left">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="反馈标题" align="left">
          <template slot-scope="scope">
            <div class="out-dot">{{ scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="类别"
          align="center"
          width="150"
          prop="gameTypeName"
          :filters="[{ text: '男', value: 1 }, { text: '女', value: 2 }, { text: '保密', value: 3 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.gender === 1" disable-transitions>男</el-tag>
            <el-tag v-else-if="scope.row.gender === 2" type="success" disable-transitions>女</el-tag>
            <el-tag v-else type="warning" disable-transitions>保密</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="gameName"
          label="所属游戏"
          :filters="[{ text: '男', value: 1 }, { text: '女', value: 2 }, { text: '保密', value: 3 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.gender === 1" disable-transitions>男</el-tag>
            <el-tag v-else-if="scope.row.gender === 2" type="success" disable-transitions>女</el-tag>
            <el-tag v-else type="warning" disable-transitions>保密</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="反馈人" width="200" prop="nickname" align="center"></el-table-column>
        <el-table-column label="联系方式" width="250" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.contactType === 1">QQ</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="反馈时间" width="150" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="setStatus(scope.$index, scope.row.id)">
              <i class="el-icon-view"></i>查阅
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">
              <i class="el-icon-delete"></i>删除
            </el-button>
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
  </div>
</template>

<script>
export default {
  name: "feedbackList",
  data() {
    return {
      visibleList: [], // 初始化为一个空数组
      tableData: [],
      multipleSelection: [], // 勾选
      emptyText: "加载中...",
      // 翻页
      searchPage: {
        page: 1,
        pageSize: 10,
        nickname: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      dialogVisible: false,
      tabTitle: "",
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 保存成功的回调
    closeCallBack() {
      // 关闭弹出框
      this.dialogVisible = false;
      // 刷新数据
      this.getList(this.searchPage);
    },
    // 查看反馈
    lookNews(id) {
      this.tabTitle = "查看反馈";
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.newsShow.getNews(true, id);
      }, 0);
    },
    // 编辑反馈
    editNews(id) {
      this.tabTitle = "编辑反馈";
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.newsShow.getNews(false, id);
      }, 0);
    },
    // 删除
    handleDelete(index, id) {
      this.$request.fetchDelNews({ id: id }).then((res) => {
        if (res.data.code === 200) {
          // 移除索引对应的那条数据
          this.tableData.splice(index, 1);
          this.$message.success("删除成功");
          // 防止当前数据删除完显示空的情况，当删除完最后一个时请求上一页数据
          if (this.tableData.length === 0) {
            this.searchPage.page--;
            this.getList(this.searchPage);
          }
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 全选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    // 反馈查询
    onSubmit() {
      this.getList(this.searchPage);
    },
    delStatusAll() {
      this.$confirm("您勾选的确定全部删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "批量删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 状态修改
    setStatus(index, id) {
      this.$request
        .fetchSetFeedBack({
          result: 2,
          ids: [id],
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$set(this.tableData[index], "status", 2);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 修改批量阅读状态
    setStatusAll() {
      this.$confirm("您勾选的确定全部审核通过吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "批量审核成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 取消
    cancelDelete(index) {
      this.$set(this.visibleList, index, false);
      this.radio = 1;
    },
    // 获取列表
    getList(data) {
      this.$request.fetchGetFeedBackList(data).then((res) => {
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
    "searchPage.title": {
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
</style>