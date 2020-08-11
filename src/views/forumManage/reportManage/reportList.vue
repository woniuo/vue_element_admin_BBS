<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="举报查询">
                <el-input v-model="searchPage.searchText" placeholder="请输入被举报人昵称查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right" v-if="multipleSelection.length>0">
            <el-button type="success" @click="setStatusAll(2)">批量审核通过</el-button>
            <el-button type="primary" @click="setStatusAll(3)">批量审核不通过</el-button>
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="60" align="center" prop="id" sortable></el-table-column>
        <el-table-column label="举报人" align="center" width="200">
          <template slot-scope="scope">
            <div class="out-dot">{{ scope.row.nickname}}</div>
          </template>
        </el-table-column>
        <el-table-column label="被举报人" align="center" width="150" prop="beNickname"></el-table-column>
        <el-table-column
          prop="gameName"
          label="被举报类型"
          :filters="[{ text: '攻略文章', value: 1 }, { text: '故事文章', value: 2 }, { text: '动态文章', value: 3 }, { text: '攻略评论', value: 4 }, { text: '故事评论', value: 5 }, { text: '动态评论', value: 6 }]"
          :filter-method="filterbReport"
          filter-placement="bottom-end"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              type="success"
              v-if="scope.row.itemType === 1 && scope.row.itemChildType === 1"
              disable-transitions
            >攻略文章</el-tag>
            <el-tag
              type="info"
              v-else-if="scope.row.itemType === 1 && scope.row.itemChildType === 2"
              disable-transitions
            >攻略评论</el-tag>
            <el-tag
              type="primary"
              v-else-if="scope.row.itemType === 2 && scope.row.itemChildType === 1"
              disable-transitions
            >故事文章</el-tag>
            <el-tag
              type="info"
              v-else-if="scope.row.itemType === 2 && scope.row.itemChildType === 2"
              disable-transitions
            >故事评论</el-tag>
            <el-tag
              type="warning"
              v-else-if="scope.row.itemType === 3 && scope.row.itemChildType === 1"
              disable-transitions
            >动态文章</el-tag>
            <el-tag
              type="info"
              v-else-if="scope.row.itemType === 3 && scope.row.itemChildType === 2"
              disable-transitions
            >动态评论</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="gameName"
          label="举报类型"
          :filters="reportedData"
          :filter-method="filterReport"
          filter-placement="bottom-end"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
            <el-button
              v-if="scope.row.resume"
              type="primary"
              size="mini"
              @click="getReportText(scope.row.resume)"
            >查看描述</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          :filters="[{ text: '待审核', value: 1 }, { text: '已通过', value: 2 }, { text: '未通过' , value: 3}]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 2">已通过</el-tag>
            <el-tag type="danger" v-else>未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="举报时间" width="200" prop="createTime" align="center" sortable></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="150"
              trigger="click"
              v-model="visibleList[scope.$index]"
            >
              <template>
                <el-row>
                  <el-col :span="24">
                    <el-radio-group v-model="radio">
                      <el-radio :label="2">通过</el-radio>
                      <el-radio :label="3">不通过</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
                <el-row class="mt10" justify="center">
                  <el-col :span="12">
                    <el-button size="mini" @click="cancelDelete(scope.$index)">取消</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="setStatus(scope.$index, scope.row.id)"
                    >确定</el-button>
                  </el-col>
                </el-row>
              </template>
              <el-button size="mini" slot="reference">状态修改</el-button>
            </el-popover>
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
    <!-- 举报内容弹窗 -->
    <template>
      <el-dialog title="举报详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div>{{reportText}}</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">朕已阅</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: "reportList",
  data() {
    return {
      dialogVisible: false,
      radio: 2, // 审核状态
      visibleList: [], // 初始化为一个空数组
      tableData: [],
      multipleSelection: [], // 勾选
      emptyText: "加载中...",
      searchPage: {
        // 分页
        userId: "",
        page: 1,
        pageSize: 10,
        searchText: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      // 举报类型
      reportedData: [],
      // 举报类型分页
      reportedPage: {
        page: 1,
        pageSize: 10,
      },
      reportText: "", // 举报内容
    };
  },
  methods: {
    // 删除
    handleDelete(index, id) {
      this.$request.fetchDelReport({ id: [id] }).then((res) => {
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
    // 被举报类型过滤
    filterbReport(value, row) {
      if (value === 1) {
        return row.itemType === 1 && row.itemChildType === 1;
      }
      if (value === 2) {
        return row.itemType === 2 && row.itemChildType === 1;
      }
      if (value === 3) {
        return row.itemType === 3 && row.itemChildType === 1;
      }
      if (value === 4) {
        return row.itemType === 1 && row.itemChildType === 2;
      }
      if (value === 5) {
        return row.itemType === 2 && row.itemChildType === 2;
      }
      if (value === 6) {
        return row.itemType === 3 && row.itemChildType === 2;
      }
    },
    // 举报类型过滤
    filterReport(value, row) {
      return row.type === value;
    },
    // 状态过滤
    filterStatus(value, row) {
      return row.status === value;
    },
    // 全选操作
    handleSelectionChange(val) {
      let arr = [];
      val.forEach((item) => {
        arr.push(item.id);
      });
      this.multipleSelection = arr;
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
    // 举报搜索
    onSubmit() {
      this.getList(this.searchPage);
    },
    // 状态修改
    setStatus(index, id) {
      this.$request
        .fetchSetReportStatus({
          approvalResult: parseInt(this.radio),
          id: [id],
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$set(this.tableData[index], "status", this.radio);
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.data.msg);
          }
          this.$set(this.visibleList, index, false); // 隐藏
          this.radio = 2; // 恢复初始值
        });
    },
    // 批量审核举报
    setStatusAll() {
      this.$confirm("您勾选的确定全部审核通过吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request
            .fetchSetReportStatus({
              approvalResult: parseInt(this.radio),
              id: this.multipleSelection,
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.getList(this.searchPage);
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 批量删除
    delStatusAll() {
      this.$confirm("您勾选的确定全部删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request
            .fetchDelReport({ id: this.multipleSelection })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              } else {
                this.$message.error("删除失败");
              }
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
      let _this = this;
      this.$request.fetchGetReportList(data).then(function (res) {
        if (res.data.code === 200) {
          _this.tableData = res.data.data.list;
          _this.searchPage.page = res.data.data.currPage;
          _this.totalCount = res.data.data.totalCount;
          _this.totalPage = res.data.data.totalPage;
        } else {
          _this.$message.error("数据获取失败");
        }
        _this.emptyText = "暂无数据";
      });
    },
    // 获取举报类型
    getReportType(data) {
      this.$request.fetchGetReportType(data).then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            let columnArr = {
              text: "",
              value: "",
            };
            columnArr.text = item.name;
            columnArr.value = item.name;
            this.columnData.push(columnArr);
          });
        }
      });
    },
    // 获取举报内容
    getReportText(text) {
      this.dialogVisible = true;
      this.reportText = text;
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.getList(this.searchPage); // 获取举报列表
    this.getReportType(this.reportedPage); // 获取举报类型
  },
  watch: {
    multipleSelection(newVal) {},
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
.like {
  color: #fa4b8b;
}
</style>