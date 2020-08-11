<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="动态查询">
                <el-input v-model="searchPage.searchText" placeholder="请输入动态标题查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right" v-if="multipleSelection.length>0">
            <el-button type="success" @click="setStatusAll(1)">批量审核通过</el-button>
            <el-button type="primary" @click="setStatusAll(2)">批量审核不通过</el-button>
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
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center" width="200">
          <template slot-scope="scope">
            <div class="out-dot">{{ scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="作者" align="center" width="150" prop="nickname"></el-table-column>
        <el-table-column
          prop="gameName"
          label="动态类型"
          :filters="[{ text: '照片', value: 1 }, { text: '视频', value: 2 }]"
          :filter-method="filterColumn"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type === 1" disable-transitions>照片</el-tag>
            <el-tag type="warning" v-else disable-transitions>视频</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评论数" width="100" prop="cmtCount" sortable align="center"></el-table-column>
        <el-table-column label="喜欢数" width="200" align="center" sortable prop="likeCount">
          <template slot-scope="scope">
            <el-tag disable-transitions>
              <i class="fa fa-heart like" aria-hidden="true"></i>
              {{scope.row.likeCount}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="浏览次数" width="100" prop="browseCount" align="center" sortable></el-table-column>
        <el-table-column label="发布时间" width="200" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column
          label="审核状态"
          :filters="[{ text: '审核中', value: 1 }, { text: '审核通过', value: 2 }, { text: '审核未通过' , value: 3}]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.approvalStatus === 1">审核中</el-tag>
            <el-tag type="success" v-else-if="scope.row.approvalStatus === 2">审核通过</el-tag>
            <el-tag type="danger" v-else>审核不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini">
              <el-link :href="httpUrl+'/picture.html?id='+scope.row.id" target="_blank">查看</el-link>
            </el-button>
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
                      <el-radio :label="1">通过</el-radio>
                      <el-radio :label="2">不通过</el-radio>
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
  </div>
</template>

<script>
export default {
  name: "dynamicList",
  data() {
    return {
      radio: 1, // 审核状态
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
    };
  },
  methods: {
    // 删除
    handleDelete(index, id) {
      this.$request.fetchDelDynamic({ id: [id] }).then((res) => {
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
    // 专栏过滤
    filterColumn(value, row) {
      return row.type === value;
    },
    // 状态过滤
    filterStatus(value, row) {
      return row.approvalStatus === value;
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
    // 动态搜索
    onSubmit() {
      this.getList(this.searchPage);
    },
    // 状态修改
    setStatus(index, id) {
      this.$request
        .fetchSetDynamicStatus({
          approvalResult: parseInt(this.radio),
          id: [id],
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$set(this.tableData[index], "approvalStatus", this.radio + 1);
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.data.msg);
          }
          this.$set(this.visibleList, index, false); // 隐藏
          this.radio = 1; // 恢复初始值
        });
    },
    // 批量修改状态
    setStatusAll(status) {
      this.$confirm("您勾选的确定全部审核通过吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request
            .fetchSetDynamicStatus({
              approvalResult: status,
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
    delStatusAll() {
      this.$confirm("您勾选的确定全部删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request
            .fetchDelDynamic({ id: this.multipleSelection })
            .then((res) => {
              if (res.data.code === 200) {
                this.getList(this.searchPage);
                this.$message({
                  type: "success",
                  message: "批量删除成功!",
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
      this.$request.fetchGetDynamicList(data).then(function (res) {
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
  },
  mounted() {
    this.getList(this.searchPage); // 获取动态列表
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