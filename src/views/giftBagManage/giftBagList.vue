<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="礼包查询">
                <el-input v-model="searchPage.giftName" placeholder="请输入礼包名称查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right">
            <router-link to="/giftBagAdd">
              <el-button type="primary">新增礼包</el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        :empty-text="emptyText"
        @expand-change="expandChange"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
      >
        <el-table-column type="expand">
          <template>
            <el-card>
              <gift-bag-goods ref="goods"></gift-bag-goods>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column label="ID" width="150" align="left">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="礼包名称" align="center" width="250">
          <template slot-scope="scope">
            <div class="out-dot">{{ scope.row.giftName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gameName"
          label="所属游戏"
          :filters="columnData"
          :filter-method="filterColumn"
          filter-placement="bottom-end"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" disable-transitions>{{scope.row.gameName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="总数量" width="150" prop="giftTotal" align="center"></el-table-column>
        <el-table-column label="允许领取次数" width="150" prop="limitUse" align="center"></el-table-column>
        <el-table-column label="已领取数量" width="150" prop="getCount" align="center"></el-table-column>
        <el-table-column label="发布时间" width="200" prop="createTime" align="center" sortable></el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button size="mini" @click="lookGiftBag(scope.row.id)">查 看</el-button>
            <router-link :to="{name: 'giftBagEdit', query: {id:scope.row.id}}">
              <el-button type="primary" size="mini" @click="editGiftBag()">
                <i class="el-icon-edit"></i>编 辑
              </el-button>
            </router-link>
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
    <!-- 公共查看 -->
    <template>
      <el-dialog
        :title="tabTitle"
        :visible.sync="dialogVisible"
        width="750px"
        :before-close="handleClose"
      >
        <gift-bag ref="giftBag" :islook="isLook"></gift-bag>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import giftBag from "./common/giftBag";
import giftBagGoods from "./common/giftBagGoods";
export default {
  name: "giftBagList",
  components: {
    giftBag,
    giftBagGoods,
  },
  data() {
    return {
      tableData: [],
      isLook: false, // 是否为查看状态
      isEdit: false, // 是否为编辑状态
      emptyText: "加载中...",
      // 翻页
      searchPage: {
        page: 1,
        pageSize: 10,
        giftName: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      dialogVisible: false,
      tabTitle: "",
      columnData: [], //所属游戏
      //设置row-key只展示一行
      expands: [], //只展开一行放入当前行id
    };
  },
  methods: {
    getRowKeys(row) {
      return row.id;
    },
    // table表格展开change事件
    expandChange(row, expandedRows) {
      // 展开时触发
      if (expandedRows.length > 0) {
        this.expands = [];
        if (row) {
          this.expands.push(row.id); //只展开当前行id
        }
        setTimeout(() => {
          this.$refs.goods.getGiftBagGoods(row.id);
        }, 50);
      } else {
        // 收起时触发
        this.expands = [];
      }
    },
    handleClose(done) {
      done();
    },
    // 保存成功的回调
    closeCallBack() {
      // 关闭弹出框
      this.dialogVisible = false;
      // 刷新数据
      this.getList(this.searchPage);
    },
    // 查看礼包
    lookGiftBag(id) {
      this.tabTitle = "查看礼包";
      this.dialogVisible = true;
      this.isLook = true;
      setTimeout(() => {
        this.$refs.giftBag.getGiftBag(id);
      }, 50);
    },
    // 编辑礼包
    editGiftBag(id) {
      this.isEdit = true;
    },
    // 删除
    handleDelete(index, id) {
      this.$request.fetchDelNews({ id: id }).then((res) => {
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
    // 分页
    handleSizeChange(val) {
      this.searchPage.pageSize = val;
      this.getList(this.searchPage);
    },
    handleCurrentChange(val) {
      this.searchPage.page = val;
      this.getList(this.searchPage);
    },
    // 礼包查询
    onSubmit() {
      this.getList(this.searchPage);
    },
    // 获取列表
    getList(data) {
      this.$request.fetchGetGiftBagList(data).then((res) => {
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
    // 所属游戏过滤
    filterColumn(value, row) {
      return row.gameName === value;
    },
    // 获取所属游戏
    getColumn(data) {
      this.$request.fetchGetGameList(data).then((res) => {
        if (res.data.code === 200) {
          res.data.data.list.forEach((item) => {
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
  },
  mounted() {
    this.getList(this.searchPage);
    this.getColumn({ page: 1, pageSize: 50, gameName: "" }); // 获取所属游戏
  },
  watch: {
    "searchPage.giftName": {
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