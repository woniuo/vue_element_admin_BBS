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
                          v-for="imgUrl in props.row.imgList"
                          :key="imgUrl"
                          class="commentImg"
                          :src="imgUrl"
                          :preview-src-list="props.row.imgList"
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
          label="游戏类型"
          align="center"
          width="150"
          prop="gameTypeName"
          :filters="gameTypeArr"
          :filter-method="filterGameType"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.gameTypeName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="gameName"
          label="所属游戏"
          :filters="gameList"
          :filter-method="filterGame"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="warning" disable-transitions>{{scope.row.gameName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="反馈人" width="200" prop="nickname" align="center"></el-table-column>
        <el-table-column label="联系方式" width="250" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.contactType === 1" class="fa fa-qq"></i>
            <i v-if="scope.row.contactType === 2" class="fa fa-phone-square"></i>
            {{scope.row.contactWay}}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 2" type="success">已阅</el-tag>
            <el-tag v-else type="info">未阅</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="反馈时间" width="150" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column label="操作" align="center" width="250">
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
      gameTypeArr: [], // 游戏类型
      gameList: [], // 所属游戏
    };
  },
  methods: {
    // 游戏类型过滤
    filterGameType(value, row) {
      return row.gameTypeName === value;
    },
    // 所属游戏过滤
    filterGame(value, row) {
      return row.gameName === value;
    },
    // 删除
    handleDelete(index, id) {
      this.$request.fetchDelFeedBack({ id: [id] }).then((res) => {
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
    // 批量删除
    delStatusAll() {
      this.$confirm("您勾选的确定全部删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 提取id
          let dataArr = [];
          this.multipleSelection.forEach((item, index) => {
            dataArr.push(item.id);
          });
          this.$request.fetchDelFeedBack({ id: dataArr }).then((res) => {
            if (res.data.code === 200) {
              // 清空当前数据
              this.tableData = [];
              // 防止当前数据删除完显示空的情况，当删除完最后一个时请求上一页数据
              if (this.tableData.length === 0) {
                this.searchPage.page--;
                this.getList(this.searchPage);
              }
              this.$message({
                type: "success",
                message: "批量删除成功!",
              });
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
            this.$message.success("查阅成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 修改批量阅读状态
    setStatusAll() {
      // 提取id
      let dataArr = [];
      this.multipleSelection.forEach((item, index) => {
        dataArr.push(item.id);
      });
      this.$confirm("您勾选的确定全部审核通过吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request.fetchSetFeedBack({ids: dataArr,result: 2}).then((res) => {
            if (res.data.code === 200) {
              // 改变状态
              this.tableData.forEach((item, index) => {
                dataArr.forEach((item1, index1) => {
                  if(item.id === item1) {
                    this.tableData[index].status = 2
                  }
                })
              })
              this.$message({
                type: "success",
                message: "批量审核成功!",
              });
            } else {
              this.$message.error("操作失败")
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
    // 获取游戏类型
    getGameType(data) {
      this.$request.fetchGetGameTypeList(data).then((res) => {
        if (res.data.code === 200) {
          let gameTypeArr = [];
          res.data.data.list.forEach((item, index) => {
            let gameTypeObj = {};
            gameTypeObj.text = item.name;
            gameTypeObj.value = item.name;
            gameTypeArr.push(gameTypeObj);
          });
          this.gameTypeArr = gameTypeArr;
        }
      });
    },
    // 获取游戏列表
    getGameList(data) {
      this.$request.fetchGetGameList(data).then((res) => {
        if (res.data.code === 200) {
          let gameListArr = [];
          res.data.data.list.forEach((item, index) => {
            let gameObj = {};
            gameObj.text = item.name;
            gameObj.value = item.name;
            gameListArr.push(gameObj);
          });
          this.gameList = gameListArr;
        }
      });
    },
  },
  mounted() {
    this.getList(this.searchPage);
    this.getGameType({ page: 1, pageSize: 20, name: "" });
    this.getGameList({ page: 1, pageSize: 20, gameName: "" });
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