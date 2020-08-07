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
      <el-table :data="tableData" style="width: 100%" @expand-change="expandChange">
        <el-table-column type="expand">
          <template slot-scope="scope">
          <el-card>
            <div v-if="gameLoad">
              <el-row class="list-box">
                <el-col :span="2">
                  <span class="left-desc">游戏名 :</span>
                </el-col>
                <el-col :span="22">
                  <div>{{gameObj.name}}</div>
                </el-col>
              </el-row>
              <el-row class="list-box">
                <el-col :span="2">
                  <span class="left-desc">简介 :</span>
                </el-col>
                <el-col :span="22">
                  <div>{{gameObj.description}}</div>
                </el-col>
              </el-row>
              <el-row class="list-box">
                <el-col :span="2">
                  <span class="left-desc">主页背景图 :</span>
                </el-col>
                <el-col :span="22">
                  <div>
                    <el-image
                      style="width:150px;height:80px"
                      v-if="gameObj.backgroundImg.length>0"
                      :src="gameObj.backgroundImg"
                      fit="cover"
                      :preview-src-list="[gameObj.backgroundImg]"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
              <el-row class="list-box">
                <el-col :span="2">
                  <span class="left-desc">游戏截图 :</span>
                </el-col>
                <el-col :span="22">
                  <div>
                    <el-row v-if="gameObj.screenshotsList && gameObj.screenshotsList.length>0">
                      <el-col :span="2" v-for="item in gameObj.screenshotsList" :key="item">
                        <el-image
                          style="width:80px;height:80px"
                          :src="item"
                          fit="cover"
                          :preview-src-list="gameObj.screenshotsList"
                        ></el-image>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row class="list-box">
                <el-col :span="2">
                  <el-row>
                    <el-col>
                      <span class="left-desc">版本信息 :</span>
                    </el-col>
                    <el-col class="mt50" aling="center">
                      <el-button type="primary" icon="el-icon-plus" circle @click="addVersions(scope.row.id)"></el-button>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="22">
                  <el-row v-if="gameObj.extendList && gameObj.extendList.length>0" class="versions">
                    <el-col
                      :span="11"
                      v-for="(bitem, index) in gameObj.extendList"
                      :key="bitem.name"
                    >
                      <el-row>
                        <el-col :span="12" class="pd10">
                          <el-tag class="mr-10">版本名称:</el-tag>
                          {{bitem.name}}
                        </el-col>
                        <el-col :span="12" class="pd10">
                          <el-tag class="mr-10">游戏大小:</el-tag>
                          {{bitem.gameSize}}M
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12" class="pd10">
                          <el-tag class="mr-10">下载地址:</el-tag>
                          <a
                            :href="bitem.gameUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="el-icon-download"
                          >点击下载</a>
                        </el-col>
                        <el-col :span="12" class="pd10">
                          <el-tag class="mr-10">发行时间:</el-tag>
                          {{bitem.updateTime}}
                        </el-col>
                      </el-row>
                      <el-row class="mt10">
                        <div class="versions-bottom">
                          <el-row>
                            <el-col align="right">
                              <el-button
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="editVersions(index, bitem.id, scope.row.id)"
                              ></el-button>
                              <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="delVersions(index, bitem.id)"
                              ></el-button>
                            </el-col>
                          </el-row>
                        </div>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="list-box">
                <el-col :span="2">
                  <span class="left-desc">所属游戏类型 :</span>
                </el-col>
                <el-col :span="22">
                  <div v-if="gameObj.typeList && gameObj.typeList.length>0">
                    <el-tag
                      class="mr10"
                      type="primary"
                      v-for="titem in gameObj.typeList"
                      :key="titem.name"
                    >{{titem.name}}</el-tag>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-else class="content-text">{{gameText}}</div>
          </el-card>
          </template>
        </el-table-column>
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
        <el-table-column label="下载次数" width="100" prop="downloadCount" align="center" sortable></el-table-column>
        <el-table-column label="游戏简介" prop="description" align="center"></el-table-column>
        <el-table-column label="发布时间" width="200" prop="createTime" align="center" sortable></el-table-column>
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
      <el-dialog
        :title="gameTitle"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <game></game>
      </el-dialog>
    </template>
    <!-- 游戏版本 -->
    <template>
      <el-dialog
        :title="vsTitle"
        :visible.sync="vsDialogVisible"
        width="30%"
        :before-close="vsHandleClose"
      >
        <el-form :model="vsRuleForm" :rules="vsRules" ref="vsRuleForm" label-width="100px">
          <el-form-item label="版本名称" prop="name">
            <el-input v-model="vsRuleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="游戏大小" prop="gameSize">
            <el-input-number v-model="vsRuleForm.gameSize" :min="0" :max="100000" label="游戏大小"></el-input-number>
          </el-form-item>
          <el-form-item label="下载路径" prop="gameUrl">
            <el-input v-model="vsRuleForm.gameUrl"></el-input>
          </el-form-item>
          <el-form-item align="right">
            <el-button type="primary" v-if="!isVsEdit" @click="saveVersions('vsRuleForm')">新 增</el-button>
            <el-button type="primary" v-else @click="saveVersions('vsRuleForm')">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import game from "./common/game"
export default {
  name: "gameList",
  components: {
    game
  },
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
      dialogVisible: false, // 新增、修改弹框
      gameTitle: "",
      ruleForm: {
        name: "", // 游戏名称
        type: "", // 游戏类别
      },
      rules: {},
      gameObj: {}, // 游戏详情
      gameText: "加载中...", // 游戏详情加载提示
      gameLoad: false, // 判断游戏详情是否加载完成
      vsDialogVisible: false, // 游戏版本新增、修改弹窗
      vsTitle: "",
      vsRuleForm: {
        gameId: undefined, // 游戏id
        name: "", // 版本名称
        gameSize: 0, // 游戏大小
        gameUrl: "", // 下载路径
        id: undefined, // 版本id
      },
      vsRadio: "", // 选择的版本
      isVsEdit: false, // 是否编辑
      vsRules: {
        name: [
          { required: true, message: "请输入版本名称", trigger: "blur" },
          { max: 20, message: "标题长度不能超过20个字符串", trigger: "blur" },
        ],
        gameSize: [
          { required: true, message: "请输入游戏大小", trigger: "change" },
        ],
        gameUrl: [
          { required: true, message: "请输入游戏下载链接", trigger: "blur" },
        ]
      },
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
      this.gameTitle = "新增游戏";
      this.dialogVisible = true;
    },
    // 修改游戏
    editGame() {
      this.gameTitle = "修改游戏";
      this.dialogVisible = true;
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
        .fetchSetGameStatus({
          status: parseInt(this.radio),
          id: id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$set(this.tableData[index], "status", this.radio);
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
    // table表格展开change事件
    expandChange(row, expandedRows) {
      // 展开时触发
      if (expandedRows.length > 0) {
        this.getGame(row.id);
      } else {
        // 收起时触发
      }
    },
    // 获取游戏详情
    getGame(id) {
      this.$request.fetchGetGame({ id: id }).then((res) => {
        if (res.data.code === 200) {
          // 判空
          let gameObjStr = JSON.stringify(res.data.data);
          if (gameObjStr === "{}") {
            this.gameText = "暂无相关游戏数据";
          } else {
            this.gameObj = res.data.data;
          }
          this.gameLoad = true;
        } else {
          this.$message.error("数据加载失败");
          this.gameText = "获取游戏数据失败,请刷新重试";
          this.gameLoad = true;
        }
      });
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
    // 游戏版本
    vsHandleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.vsRuleForm.name = "", // 版本名称
          this.vsRuleForm.gameId = undefined, // 游戏id
          this.vsRuleForm.gameSize = 0, // 游戏大小
          this.vsRuleForm.gameUrl =  "", // 下载路径
          this.vsRuleForm.id = undefined, // 版本id
          done();
        })
        .catch((_) => {});
    },
    // 版本新增
    addVersions(gameId) {
      this.vsRuleForm.gameId = gameId
      this.vsTitle = "新增版本";
      this.isVsEdit = false;
      this.vsDialogVisible = true;
    },
    // 版本修改
    editVersions(index, vsId, gameId) {
      // 获取当前版本信息
      this.$request.fetchGetVersions({id: vsId}).then( res => {
        if(res.data.code === 200) {
          this.vsRuleForm = res.data.data
        } else {
          this.$message.error("数据加载失败")
        }
      })
      this.vsTitle = "修改版本";
      this.isVsEdit = true;
      this.vsDialogVisible = true;
    },
    // 版本删除
    delVersions(index, vsId) {
      this.$request.fetchDelVersions({id: vsId}).then( res => {
        if(res.data.code === 200) {
          // 数据删除
         this.tableData.splice(index, 1);
          this.$message.success("删除成功")
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    // 版本新增、修改提交
    saveVersions(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchAddVersions(this.vsRuleForm).then((res) => {
            if (res.data.code === 200) {
              if (!this.isVsEdit) {
                this.$message.success("新增成功");
              } else {
                this.$message.success("保存成功");
              }
              this.vsDialogVisible = false
            } else {
              if (!this.isVsEdit) {
                this.$message.error("新增失败");
              } else {
                this.$message.error("保存失败");
              }
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
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
.mt20 {
  margin-top: 20px;
}
.mt50 {
  margin-top: 50px;
}
.out-dot {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left-desc {
  color: #999999;
}
.list-box {
  padding: 20px 0px;
  border-bottom: 2px dashed #eeeeee;
}
.pd10 {
  padding: 10px;
}
.r-line {
  border-right: 1px solid #eeeeee;
}
.mr10 {
  margin-right: 10px;
}
.content-text {
  text-align: center;
}
.versions > div:nth-child(2n-1) {
  margin: 5px;
  background: #6099fb;
  border-radius: 10px;
  color: #ffffff;
  a {
    color: #ffffff;
  }
}
.versions > div:nth-child(2n) {
  margin: 5px;
  background: #f26b6b;
  border-radius: 10px;
  color: #ffffff;
  a {
    color: #ffffff;
  }
}
.versions-bottom {
  background-color: #ffffff;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 0px 3px #cccccc;
  padding: 10px;
}
.vsradio .el-radio__inner {
  width: 20px !important;
  height: 20px !important;
}
</style>