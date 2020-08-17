<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="用户查询">
                <el-input v-model="searchPage.phone" placeholder="请输入手机号码查询"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="searchPage.gender" placeholder="选择用户性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                  <el-option label="保密" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right" v-if="multipleSelection.length>0">
            <el-button type="danger" @click="setStatusAll">一键禁用所有用户</el-button>
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
        <el-table-column label="昵称" align="center" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.nickname }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          :filters="[{ text: '男', value: 1 }, { text: '女', value: 2 }, { text: '保密', value: 3 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.gender === 1" disable-transitions>男</el-tag>
            <el-tag v-else-if="scope.row.gender === 2" type="success" disable-transitions>女</el-tag>
            <el-tag v-else type="warning" disable-transitions>保密</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发帖数" align="center">
          <template slot-scope="scope">
            <el-tag size="medium">攻略: {{ scope.row.strategyNum }}</el-tag>
            <el-tag size="medium">故事: {{ scope.row.storyNum }}</el-tag>
            <el-tag size="medium">动态: {{ scope.row.photoNum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="250" align="center" prop="createTime" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          :filters="[{ text: '启用', value: 1 }, { text: '禁用', value: 2 }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p>点击修改状态</p>
              <div slot="reference" class="name-wrapper">
                <el-tag
                  v-if="scope.row.status === 1"
                  type="success"
                  close-transition
                  @click="setStatus(scope.row.id,1)"
                  v-role-btn="'80'"
                >启用</el-tag>
                <el-tag v-else type="danger" close-transition @click="setStatus(scope.row.id,2)">禁用</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="lookUserInfo(scope.row.id)" v-role-btn="'53'">查看</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)" v-role-btn="'54'">
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-role-btn="'55'">
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
    <!-- 用户信息显示组件 -->
    <template>
      <user-info-show
        :dialogVisible="dialogVisible"
        ref="userInfoShow"
        @successCallback="successCallback"
      ></user-info-show>
    </template>
    <!-- 用户信息编辑组件 -->
    <template>
      <user-info-edit
        :dialogVisible="dialogVisibleEdit"
        ref="userInfoEdit"
        @editCallback="editCallback"
      ></user-info-edit>
    </template>
  </div>
</template>

<script>
import userInfoShow from "../../components/userInfo/userInfoShow";
import userInfoEdit from "../../components/userInfo/userInfoEdit";
export default {
  name: "userList",
  components: {
    userInfoShow,
    userInfoEdit,
  },
  data() {
    return {
      // 用户信息弹出框显示
      dialogVisible: false,
      userId: "", // 当前点击的用户id
      dialogVisibleEdit: false, // 用户信息编辑显示
      tableData: [],
      multipleSelection: [],
      emptyText: "加载中...",
      searchPage: {
        // 翻页
        gender: "",
        page: 1,
        pageSize: 10,
        phone: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
    };
  },
  methods: {
    handleEdit(index, id) {
      this.dialogVisibleEdit = true;
      this.$refs.userInfoEdit.getUserInfo(id);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    filterTag(value, row) {
      return row.gender === value;
    },
    filterStatus(value, row) {
      console.log(row.status, value);
      return row.status === value;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.searchPage.pageSize = val;
      this.getUserList(this.searchPage);
    },
    handleCurrentChange(val) {
      this.searchPage.page = val;
      this.getUserList(this.searchPage);
    },
    // 用户查询
    onSubmit() {
      this.getUserList(this.searchPage);
    },
    // 用户信息查看
    lookUserInfo(id) {
      this.dialogVisible = true;
      this.$refs.userInfoShow.getUserInfo(id);
    },
    successCallback() {
      this.dialogVisible = false;
    },
    editCallback() {
      this.dialogVisibleEdit = false;
    },
    // 状态修改
    setStatus(id, type) {
      let _this = this;
      // 1.根据type值判断当前是开启还是禁用状态 2.根据id进行查找 3.修改数据
      switch (type) {
        case 1:
          this.$request
            .fetchSetUserStatus({ userId: id, status: 2 })
            .then(function (res) {
              if (res.data.code === 200) {
                _this.tableData.forEach((item, index) => {
                  if (item.id === id) {
                    _this.tableData[index].status = 2;
                  }
                });
                _this.$message.success({
                  message: "修改成功",
                });
              }
            });
          break;
        case 2:
          this.$request
            .fetchSetUserStatus({ userId: id, status: 1 })
            .then(function (res) {
              if (res.data.code === 200) {
                _this.tableData.forEach((item, index) => {
                  if (item.id === id) {
                    _this.tableData[index].status = 1;
                  }
                });
                _this.$message.success({
                  message: "修改成功",
                });
              }
            });
          break;
      }
    },
    // 批量禁用用户
    setStatusAll() {
      this.$confirm("您勾选的确定全部禁用吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "批量禁用成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    getUserList(data) {
      this.$request.fetchGetUserList(data).then((res) => {
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
    this.getUserList(this.searchPage);
  },
  watch: {
    "searchPage.phone": {
      handler(newVal) {
        if (newVal.length === 0) {
          this.searchPage.page = 1;
          this.getUserList(this.searchPage);
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