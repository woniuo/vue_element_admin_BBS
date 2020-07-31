<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="公告查询">
                <el-input v-model="searchPage.title" placeholder="请输入公告标题查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right" v-if="multipleSelection.length>0">
            <el-button type="success" @click="setStatusAll(1)">批量启用</el-button>
            <el-button type="primary" @click="setStatusAll(2)">批量禁用</el-button>
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
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <div class="out-dot">{{ scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="发布人" align="center" width="200" prop="nickname"></el-table-column>
        <el-table-column label="浏览次数" width="200" prop="browseCount" align="center" sortable></el-table-column>
        <el-table-column label="发布时间" width="250" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column
          label="公告状态"
          :filters="[{ text: '启用', value: 1 }, { text: '禁用', value: 2 }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 2">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
           <el-button size="mini" @click="lookNotice(scope.row.id)">查看公告</el-button>
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
                      <el-radio :label="1">启用</el-radio>
                      <el-radio :label="2">禁用</el-radio>
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
            <el-button type="primary" size="mini" @click="editNotice(scope.row.id)">编辑</el-button>
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
    <!-- 公共查看/编辑 -->
    <template>
      <el-dialog :title="tabTitle" :visible.sync="dialogVisible" width="75%" :before-close="handleClose">
        <v-notice ref="noticeShow"></v-notice>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import notice from "../common/notice";
export default {
  name: "announcementList",
  components: {
    vNotice: notice,
  },
  data() {
    return {
      radio: 1, // 审核状态
      visibleList: [], // 初始化为一个空数组
      tableData: [],
      multipleSelection: [], // 勾选
      emptyText: "加载中...",
      // 翻页
      searchPage: {
        page: 1,
        pageSize: 10,
        title: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      dialogVisible: false,
      tabTitle: ""
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
    // 查看公告
    lookNotice(id) {
      this.tabTitle = "查看公告"
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.noticeShow.getNotice(true, id)
      },0)
    },
    // 编辑公告
    editNotice(id) {
       this.tabTitle = "编辑公告"
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.noticeShow.getNotice(false, id)
      },0)
    },
    // 删除
    handleDelete(index, nid) {
      this.$request.fetchDelNotice({ id: nid }).then((res) => {
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
    // 游戏过滤
    filterGames(value, row) {
      return row.gameName === value;
    },
    // 状态过滤
    filterStatus(value, row) {
      return row.status === value;
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
    // 公告查询
    onSubmit() {
      this.getList(this.searchPage);
    },
    // 状态修改
    setStatus(index, id) {
      this.$request
        .fetchSetNoticeStatus({
          approvalResult: parseInt(this.radio),
          id: id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$set(this.tableData[index], "status", this.radio + 1);
            this.$set(this.visibleList, index, false); // 隐藏
            this.radio = 1; // 恢复初始值
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 批量修改状态
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
    // 取消
    cancelDelete(index) {
      this.$set(this.visibleList, index, false);
      this.radio = 1;
    },
    // 获取列表
    getList(data) {
      this.$request.fetchGetNoticeList(data).then(res => {
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
</style>