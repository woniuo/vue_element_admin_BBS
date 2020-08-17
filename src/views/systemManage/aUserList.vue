<template>
  <div>
    <el-card>
      <el-row :span="24">
        <el-col :span="12">
          <el-form :inline="true" :model="searchPage" class="demo-form-inline">
            <el-form-item label="系统用户查询">
              <el-input v-model="searchPage.username" placeholder="请输入系统用户名查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" align="right">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="addUserFn"
            plain
            v-role-btn="'106'"
          >添加账号</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div class="cardshadow roleListTable">
      <el-table :data="userListData">
        <el-table-column prop="id" label="用户ID" align="center" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :filters="[{ text: '启用', value: true }, { text: '禁用', value: false }]"
          :filter-method="filterTag"
          width="150"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.userStatus" @change="setStatus($event, scope.row.id)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="created" label="创建时间" align="center" width="200"></el-table-column>
        <el-table-column prop="updated" label="上次修改时间" align="center" width="200"></el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <user-info
      v-if="dialogVisible"
      :title="title"
      :dialogVisible="dialogVisible"
      :userId="userId"
      @successCallback="successCallback"
    />
  </div>
</template>

<script>
import UserInfo from "../../components/userForm/userInfo";
export default {
  name: "aUserList",
  components: { UserInfo },
  data() {
    return {
      sort: null,
      userListData: [],
      emptyText: "加载中...",
      // 翻页
      searchPage: {
        page: 1,
        pageSize: 10,
        username: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      dialogVisible: false,
      title: "",
      userId: null,
    };
  },
  methods: {
    // 状态修改
    setStatus(val, id) {
      this.$request
        .fetchSetSystemUserStatus({
          sysUserId: id,
        })
        .then((res) => {
          if (res.data.code === 200) {
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
    filterTag(value, row) {
      return row.userStatus === value;
    },
    addUserFn() {
      this.dialogVisible = true;
      this.title = "添加账号";
      this.userId = null;
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.title = "编辑信息";
      this.userId = row.id;
    },
    successCallback() {
      this.dialogVisible = false;
      this.getList(this.searchPage);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
      this.$request
        .fetchDelUser({
          id: row.id,
        })
        .then((response) => {
          that.$message({
            showClose: true,
            message: response.data.message,
            type: "success",
          });
          that.getList({
            currentPage: that.currentPage,
            pageSize: 10,
          });
        })
        .catch((err) => {
          console.log(err);
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
    // 用户查询
    onSubmit() {
      this.getList(this.searchPage);
    },
    getList(data) {
      let that = this;
      this.$request
        .fetchUserList(data)
        .then((res) => {
          if (res.data.code === 200) {
            this.userListData = res.data.data.list;
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getList(this.searchPage);
  },
  watch: {
    "searchPage.username": {
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

<style scoped>
.mt10 {
  margin-top: 10px;
}
</style>
