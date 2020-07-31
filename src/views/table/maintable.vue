<template>
    <div>
      <p class="title"><i class="el-icon-tickets"></i>最新10条等待审批帖子</p>
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        >
        <el-table-column
          type="index"
          label="序号"
          align="center">
        </el-table-column>
        <el-table-column
          sortable
          prop="id"
          label="文章ID"
          align="center">
        </el-table-column>
          <el-table-column
          prop="title"
          label="文章标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="作者昵称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="发帖状态"
          width="130"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间"
          sortable
          align="center"
        >
         <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
         </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="板块分类"
          width="150"
          :filters="[{ text: '玩家攻略', value: '玩家攻略' }, { text: '心情故事', value: '心情故事' }, { text: '玩家动态', value: '玩家动态' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          align="center">
          <template slot-scope="scope">
               <el-tag
              v-if="scope.row.tag === '玩家攻略'"
              disable-transitions>{{scope.row.tag}}</el-tag>
              <el-tag
              v-else-if="scope.row.tag === '心情故事'" type="success"
              disable-transitions>{{scope.row.tag}}</el-tag>
               <el-tag
               v-else type="warning"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
             <el-popover
              placement="top"
              width="150"
              trigger="click"
              v-model="visibleList[scope.$index]"
              >
              <template>
                <el-row>
                  <el-col :span="12">
                    <el-radio  v-model="radio" label="1">通过</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio v-model="radio" label="2">不通过</el-radio>
                  </el-col>
                </el-row>
                <el-row class="mt10" justify="center">
                  <el-col :span="12">
                    <el-button size="mini"  @click="cancelDelete(scope.$index)">取消</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button 
                    size="mini" 
                    type="primary"
                    @click="statusSave(scope.$index, scope.row)">确定</el-button>
                  </el-col>
                </el-row>
              </template>
               <el-button
                size="mini"
                slot="reference"
                >状态修改</el-button>
            </el-popover>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: "maintable",
  data () {
    return {
      radio: '1', // 状态
      visibleList: [], // 初始化为一个空数组
      tableData: [{
        id: "201801012345601",
        name: "王小虎",
        status: "待审核",
        title: "玩家攻略",
        date: "2018-01-01",
        tag: "玩家攻略"
      }, {
        id: "201801012345602",
        name: "王小虎",
        status: "待审核",
        title: "玩家动态",
        date: "2018-01-02",
        tag: "玩家动态"
      }, {
        id: "201801012345603",
        name: "王小虎",
        status: "待审核",
        title: "心情故事",
        date: "2018-01-03",
        tag: "心情故事"
      }, {
        id: "201801012345604",
        name: "王小虎",
        status: "待审核",
        title: "心情故事",
        date: "2018-01-03",
        tag: "心情故事"
      }, {
        id: "201801012345605",
        name: "王小虎",
        status: "待审核",
        title: "玩家动态",
        date: "2018-01-04",
        tag: "玩家动态"
      }, {
        id: "201801012345606",
        name: "王小虎",
        status: "待审核",
        title: "玩家动态",
        date: "2018-01-04",
        tag: "玩家动态"
      }, {
        id: "201801012345607",
        name: "王小虎",
        status: "待审核",
        title: "玩家攻略",
        date: "2018-01-04",
        tag: "玩家攻略"
      }, {
        id: "201801012345608",
        name: "王小虎",
        status: "待审核",
        title: "玩家攻略",
        date: "2018-01-04",
        tag: "玩家攻略"
      }, {
        id: "201801012345609",
        name: "王小虎",
        status: "待审核",
        title: "玩家动态",
        date: "2018-01-05",
        tag: "玩家动态"
      }, {
        id: "201801012345610",
        name: "王小虎",
        status: "待审核",
        title: "心情故事",
        date: "2018-01-05",
        tag: "心情故事"
      }]
    }
  },
  methods: {
    // 取消
		cancelDelete(index) {
      this.$set(this.visibleList, index, false);
      this.radio = '1'
		},
    statusSave (index, row) {
      this.$message({
        showClose: true,
        message: "操作成功",
        row,
        type: "success"
      })
      this.$set(this.visibleList, index, false);
      this.radio = '1'
    },
    handleDelete (index, row) {
      console.log(index, row)
     this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    }
  }
}
</script>

<style scoped>
.txt-center{
  text-align: center;
}
.mt10{
  margin-top: 10px;
}
</style>
