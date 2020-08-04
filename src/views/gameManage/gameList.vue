<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="游戏查询">
                <el-input v-model="searchPage.title" placeholder="请输入游戏名称查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="primary" @click="addGame">新增游戏</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        :empty-text="emptyText"
      >
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="游戏名称" align="center">
          <template slot-scope="scope">
            <div class="out-dot">{{ scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="封面图" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              v-if="scope.row.cover"
              :src="scope.row.cover"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="浏览次数" width="200" prop="browseCount" align="center" sortable></el-table-column>
        <el-table-column label="发布时间" width="250" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column
          label="游戏状态"
          :filters="[{ text: '上架', value: 1 }, { text: '维护中', value: 2 }, { text: '下架', value: 3 }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">上架</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 2">维护中</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 3">下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="250"
              trigger="click"
              v-model="visibleList[scope.$index]"
            >
              <template>
                <el-row>
                  <el-col :span="24" align="center">
                    <el-radio-group v-model="radio">
                      <el-radio :label="1">上架</el-radio>
                      <el-radio :label="2">维护中</el-radio>
                      <el-radio :label="3">下架</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
                <el-row class="mt10" justify="center">
                  <el-col :span="12" align="center">
                    <el-button size="mini" @click="cancelDelete(scope.$index)">取消</el-button>
                  </el-col>
                  <el-col :span="12" align="center">
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
            <el-button size="mini" type="primary" @click="editGame(scope.$index, scope.row.id)">
              <i class="el-icon-edit"></i>
              修 改
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">
              <i class="el-icon-delete"></i>删 除
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
    <!-- 游戏新增 -->
    <template>
      <el-dialog :title="gameTitle" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="游戏名" prop="name">
        </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: "gameList",
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
      gameTitle: "",
      ruleForm: {
        name: "", // 游戏名称
        type: "", // 游戏类别

      }
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
    // 新增游戏
    addGame() {
      this.gameTitle = "新增游戏"
      this.dialogVisible = true
    },
    // 修改游戏
    editGame() {
      this.gameTitle = "修改游戏"
      this.dialogVisible = true
    },
    // 游戏过滤
    filterGames(value, row) {
      return row.gameName === value;
    },
    // 状态过滤
    filterStatus(value, row) {
      return row.status === value;
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
    // 游戏查询
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
    // 取消
    cancelDelete(index) {
      this.$set(this.visibleList, index, false);
      this.radio = 1;
    },
    // 获取列表
    getList(data) {
      this.$request.fetchGetGameList(data).then((res) => {
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