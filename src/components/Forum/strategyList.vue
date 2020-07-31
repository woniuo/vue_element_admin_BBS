<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="文章查询">
                <el-input v-model="searchPage.phone" placeholder="请输入文章标题查询"></el-input>
              </el-form-item>
              <el-form-item label="所属专栏">
                <el-select v-model="searchPage.gender" placeholder="选择所属游戏">
                  <el-option label="天胡十三浪" value="1"></el-option>
                  <el-option label="欢乐斗地主" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </el-card>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column label="作者" align="center" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.nickname }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gameName"
          label="游戏专栏"
          :filters="[{ text: '天湖十三浪', value: '天湖十三浪' }, { text: '欢乐斗地主', value: '欢乐斗地主' }]"
          :filter-method="filterGames"
          filter-placement="bottom-end"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" disable-transitions>{{scope.row.gameName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评论数" prop="cmtCount" align="center"></el-table-column>
        <el-table-column label="顶/踩数" align="center">
          <template slot-scope="scope">
            <el-tag disable-transitions>
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              {{scope.row.upCount}}
            </el-tag>
            <el-tag disable-transitions>
              <i class="fa fa-hand-o-down" aria-hidden="true"></i>
              {{scope.row.stepCount}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="浏览次数" prop="browseCount" align="center"></el-table-column>
        <el-table-column label="发布时间" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column
          label="审核状态"
          :filters="[{ text: '审核中', value: 1 }, { text: '审核通过', value: 2 }, { text: '审核未通过' , value: 3}]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.approvalStatus === 1">审核中</el-tag>
            <el-tag type="success" v-else-if="scope.row.approvalStatus === 2">审核通过</el-tag>
            <el-tag type="success" v-else>审核不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="lookUserInfo(scope.row.id)">查看</el-button>
            <el-button size="mini" @click="setStatus()">修改状态</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
    <!-- 状态修改 -->
    <template>
      <el-dialog
        title="状态修改"
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose"
        class="animated fadeInDown"
      >
        <div>
          <el-radio-group>
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核不通过</el-radio>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: "strategyList",
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          title: "标题1",
          nickname: "作者1",
          gameName: "天湖十三浪",
          cmtCount: 88,
          stepCount: 239,
          upCount: 22,
          browseCount: 999,
          createTime: "2020-02-22",
          approvalStatus: 1
        }
      ],
      multipleSelection: [],
      // 翻页
      searchPage: {
        gender: "",
        page: 1,
        pageSize: 10,
        phone: ""
      },
      totalCount: 0, // 总条数
      totalPage: 0 // 总页数
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
    filterGames(value, row) {
      return row.sex === value;
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
    setStatus(id, type) {},
    getUserList(data) {
      let _this = this;
      this.$request.fetchGetUserList(data).then(function(res) {
        _this.tableData = res.data.data.list;
        _this.searchPage.page = res.data.data.currPage;
        _this.totalCount = res.data.data.totalCount;
        _this.totalPage = res.data.data.totalPage;
      });
    }
  },
  mounted() {
    this.getUserList(this.searchPage);
  }
};
</script>
<style lang="scss" scoped>
.name-wrapper > span {
  cursor: pointer;
}
</style>