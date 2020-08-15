<template>
    <div>
      <p class="title"><i class="el-icon-tickets"></i>最新10条等待审批帖子</p>
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        :empty-text="emptyText"
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
          prop="nickname"
          label="作者昵称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="approvalStatus"
          label="发帖状态"
          width="130"
          align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.approvalStatus == 1" type="info"> 待审批</el-tag>
            <el-tag v-else type="primary" > 已审批</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          sortable
          align="center"
        >
         <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
         </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="板块分类"
          width="150"
          :filters="[{ text: '玩家攻略', value: 1 }, { text: '心情故事', value: 2 }, { text: '玩家动态', value: 3 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          align="center">
          <template slot-scope="scope">
               <el-tag
              v-if="scope.row.type === 1"
              disable-transitions>玩家攻略</el-tag>
              <el-tag
              v-else-if="scope.row.tag === 2" type="success"
              disable-transitions>心情故事</el-tag>
               <el-tag
               v-else type="warning"
              disable-transitions>玩家动态</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">
              <el-link :href="httpUrl+'/strategy.html?id='+scope.row.id" target="_blank">详 情</el-link>
              </el-button>
             <el-popover
              placement="top"
              width="150"
              trigger="click"
              v-model="visibleList[scope.$index]"
              >
              <template>
                <el-row>
                  <el-col :span="12">
                    <el-radio  v-model="radio" :label="1">通 过</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio v-model="radio" :label="2">不通过</el-radio>
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
              @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
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
      radio: 1, // 状态
      visibleList: [], // 初始化为一个空数组
      emptyText: "加载中...",
      tableData: []
    }
  },
  methods: {
    // 取消
		cancelDelete(index) {
      this.$set(this.visibleList, index, false);
      this.radio = 1
		},
    statusSave (index, row) {
      switch (row.type) {
        case 1: this.setStrategyStatus(index, this.radio, row.id)
        case 2: this.setStoryStatus(index, this.radio, row.id)
        case 3: this.setDynamicStatus(index, this.radio, row.id)
      }
      this.$set(this.visibleList, index, false);
      this.radio = 1
    },
    handleDelete (index, row) {
      console.log(index, row)
     this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          switch (row.type) {
            case 1: this.delStrategy(index, row.id)
            case 2: this.delStory(index, row.id)
            case 3: this.delDynamic(index, row.id)
          }
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
      return row.type === value
    },
    // 攻略状态修改
    setStrategyStatus (index, status, id) {
        this.$request.fetchSetStrategyStatus({approvalResult: status, id: [id]}).then( res => {
          if (res.data.code === 200) {
            // 删除当前条
            this.tableData.splice(index, 1)
            this.$message.success("操作成功")
          } else {
            this.$message.error("操作失败")
          }
        })
    },
    // 故事状态修改
    setStoryStatus (index, status, id) {
      this.$request.fetchSetStoryStatus({approvalResult: status, id: [id]}).then( res => {
          if (res.data.code === 200) {
            // 删除当前条
            this.tableData.splice(index, 1)
            this.$message.success("操作成功")
          } else {
            this.$message.error("操作失败")
          }
        })
    },
    // 动态状态修改
    setDynamicStatus (index, status, id) {
       this.$request.fetchSetDynamicStatus({approvalResult: status, id: [id]}).then( res => {
          if (res.data.code === 200) {
            // 删除当前条
            this.tableData.splice(index, 1)
            this.$message.success("操作成功")
          } else {
            this.$message.error("操作失败")
          }
        })
    },
    // 攻略删除
    delStrategy (index, id) {
      this.$request.fetchDelStrategy({strategyId: [id]}).then( res => {
          if (res.data.code === 200) {
            // 删除当前条
            this.tableData.splice(index, 1)
            this.$message.success("删除成功")
          } else {
            this.$message.error("删除失败")
          }
        })
    },
    // 故事删除
    delStory (index, id) {
      this.$request.fetchDelStory({storyId: [id]}).then( res => {
          if (res.data.code === 200) {
            // 删除当前条
            this.tableData.splice(index, 1)
            this.$message.success("删除成功")
          } else {
            this.$message.error("删除失败")
          }
        })
    },
    // 动态删除
    delDynamic (index, id) {
      this.$request.fetchDelDynamic({id: [id]}).then( res => {
          if (res.data.code === 200) {
            // 删除当前条
            this.tableData.splice(index, 1)
            this.$message.success("删除成功")
          } else {
            this.$message.error("删除失败")
          }
        })
    },
    // 获取待审数据
    getPendingData () {
      this.$request.fetchGetMainPending().then( res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.$message.error("最新待审数据加载失败")
        }
        this.emptyText= "暂无数据"
      })
    }
  },
  mounted () {
    this.getPendingData()
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
