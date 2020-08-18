<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="广告查询">
                <el-input v-model="searchPage.title" placeholder="请输入广告标题查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right" v-if="multipleSelection.length>0">
            <el-button type="danger" @click="delStatusAll" v-role-btn="'105'">批量删除</el-button>
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
        <el-table-column label="ID" width="50" align="left">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="广告标题" prop="title" align="center" width="200">
        </el-table-column>
        <el-table-column label="广告封面" prop="adImg" align="center" width="200">
          <template slot-scope="prop">
            <el-image
              v-if="prop.row.adImg.length>0"
              :src="prop.row.adImg"
              fit="cover"
              :preview-src-list="[prop.row.adImg]"
              style="width:50px;height:80px"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="投放人" prop="adPeopleName" align="center" width="100"></el-table-column>
        <el-table-column label="投放链接" prop="adLink" align="center" width="250">
            <template slot-scope="scope">
                <el-link type="primary" :href="scope.row.adLink" target="_blank">{{scope.row.adLink}}</el-link>
            </template>
        </el-table-column>
        <el-table-column label="发布人" prop="username" align="center" width="100"></el-table-column>
        <el-table-column
          label="投放状态"
          align="center"
          width="150"
          prop="type"
          :filters="[{text: '投放中', value: true}, {text: '投放停止', value: false}]"
          :filter-method="filterActiveType"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="setStatus($event, scope.row.id)" v-role-btn="'103'"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="投放时间"  width="200" align="center">
            <template slot-scope="scope">
                <el-row>
                    <el-col :span="24">
                        {{scope.row.startTime}}
                    </el-col>
                    <el-col :span="24">
                        {{scope.row.stopTime}}
                    </el-col>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column label="总投放时间" prop="allTime" align="center" width="100">
          <template slot-scope="scope">
            {{scope.row.allTime}} 天
          </template>
        </el-table-column>
        <el-table-column label="投放金额"  align="center" width="100">
            <template slot-scope="scope">
               <span>￥{{scope.row.money}}</span>
            </template>
        </el-table-column>
        <el-table-column label="发布时间" width="200" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column label="操作" align="center" width="250" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{ name:'adEdit', query:{id:scope.row.id} }">
              <el-button size="mini" type="primary" v-role-btn="'104'">
                <i class="el-icon-edit"></i>编 辑
              </el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)" v-role-btn="'105'">
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
  name: "adList",
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
        title: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
    };
  },
  methods: {
    // 链接类型过滤
    filterActiveType(value, row) {
      return row.status === value;
    },
    // 删除
    handleDelete(index, id) {
      this.$request.fetchDelAd({ id: id }).then((res) => {
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
    // 广告查询
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
    setStatus(val, id) {
      this.$request
        .fetchSetAdStatus({
          id: id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 获取列表
    getList(data) {
      this.$request.fetchGetAdList(data).then((res) => {
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
      immediate: true
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