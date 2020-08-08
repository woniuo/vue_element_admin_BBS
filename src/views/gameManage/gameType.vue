<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="游戏类型查询">
                <el-input v-model="searchPage.phone" placeholder="请输入游戏类型名称查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right">
            <el-row>
              <el-col :span="20">
                <el-input
                  type="text"
                  placeholder="请输入新增游戏类型名称"
                  v-model="name"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="addGameType">新 增</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-table :data="tableData" style="width: 100%" :empty-text="emptyText">
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型名称" align="center" width="400">
          <template slot-scope="scope">
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="scope.row.name"
              maxlength="20"
              show-word-limit
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="saveGameType(scope.$index, scope.row.id, scope.row.name)"
            >
              <i class="el-icon-edit"></i>保 存
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="gameTypeDelete(scope.$index, scope.row.id)"
            >
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
  </div>
</template>

<script>
export default {
  name: "gameType",
  data() {
    return {
      tableData: [],
      name: "", // 新增游戏类型名称
      emptyText: "加载中...",
      searchPage: {
        // 翻页
        gender: "",
        page: 1,
        pageSize: 10,
        name: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
    };
  },
  methods: {
    // 新增游戏类型
    addGameType() {
      this.$request
        .fetchAddGameType({ id: "", name: this.name })
        .then((res) => {
          if (res.data.code === 200) {
            this.getGameTypeList(this.searchPage)
            this.$message.success("新增成功");
          } else {
            this.$message.error("新增失败");
          }
        });
    },
    // 修改、保存
    saveGameType(index, id, name) {
      this.$request.fetchAddGameType({ id: id, name: name }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    // 删除
    gameTypeDelete(index, id) {
      this.$request.fetchDelGameType({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.tableData.splice(index, 1)
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      });
      console.log(index, row);
    },
    // 翻页
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.searchPage.pageSize = val;
      this.getGameTypeList(this.searchPage);
    },
    handleCurrentChange(val) {
      this.searchPage.page = val;
      this.getGameTypeList(this.searchPage);
    },
    // 游戏类型查询
    onSubmit() {
      this.getGameTypeList(this.searchPage);
    },
    getGameTypeList(data) {
      this.$request.fetchGetGameTypeList(data).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.searchPage.page = res.data.data.currPage;
          this.totalCount = res.data.data.totalCount;
          this.totalPage = res.data.data.totalPage;
        } else {
          this.$message.error("数据加载失败");
        }
        this.emptyText = "暂无数据";
      });
    },
  },
  mounted() {
    this.getGameTypeList(this.searchPage);
  },
  watch: {
    "searchPage.name": {
      handler(newVal) {
        if (newVal.length === 0) {
          this.searchPage.page = 1;
          this.getGameTypeList(this.searchPage);
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
</style>