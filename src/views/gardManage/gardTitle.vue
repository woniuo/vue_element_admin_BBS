<template>
  <div>
    <template>
      <el-card>
        <el-row :span="24">
          <el-col :span="12">
            <el-form :inline="true" :model="searchPage" class="demo-form-inline">
              <el-form-item label="头衔查询">
                <el-input v-model="searchPage.name" placeholder="请输入头衔名称查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="primary" @click="addGradTitle">新增头衔</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-table :data="tableData" style="width: 100%" :empty-text="emptyText">
        <el-table-column label="ID" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头衔名称" align="center">
          <template slot-scope="scope">
            <div class="out-dot">{{ scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="头衔图片" align="center">
          <template slot-scope="scope">
            <img style="width:155px;height:auto" :src="scope.row.imgUrl" :alt="scope.row.name">
          </template>
        </el-table-column>
        <el-table-column label="等级区间" prop="levelRange" align="center"></el-table-column>
        <el-table-column label="描述" prop="description" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getGradTitle(scope.row.id)">编辑</el-button>
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
    <!-- 公共查看/编辑 -->
    <template>
      <el-dialog
        :title="tabTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          :inline="true"
          :model="submitForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-form-inline"
        >
          <el-form-item label="头衔名称" prop="name">
            <el-input v-model="submitForm.name" placeholder="请输入头衔名称"></el-input>
          </el-form-item>
          <el-form-item label="头衔图片" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              :action="apiUrl+'/upload/uploadFile'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-progress="uploadFileProcess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="submitForm.imgUrl" :src="submitForm.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="up-desc">说明: 上传图片大小不能超过8M</span>
            <div v-if="progressFlag" class="progress-box">
              <el-progress :percentage="progressPercent"></el-progress>
            </div>
          </el-form-item>
          <el-form-item label="等级区间" prop="levelRange">
            <el-input v-model="submitForm.levelRange" placeholder="例: 1~5"></el-input>
          </el-form-item>
          <el-form-item label="头衔描述" prop="description">
            <el-input
              type="textarea"
              maxlength="30"
              show-word-limit
              v-model="submitForm.description"
              placeholder="请输入头衔描述"
            ></el-input>
          </el-form-item>
          <el-row :span="24">
            <el-col :span="24" align="right">
              <el-form-item align="center">
                <el-button v-if="isNewAdd" type="primary" @click="submit('ruleForm')">增 加</el-button>
                <el-button v-else type="primary" @click="editGardTitle('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: "gardTitle",
  data() {
    return {
      radio: 1, // 审核状态
      visibleList: [], // 初始化为一个空数组
      tableData: [],
      progressFlag: false, // 进度条是否显示
      progressPercent: 0, // 进度条
      emptyText: "加载中...",
      // 翻页
      searchPage: {
        page: 1,
        pageSize: 10,
        name: "",
      },
      totalCount: 0, // 总条数
      totalPage: 0, // 总页数
      dialogVisible: false,
      tabTitle: "",
      submitForm: {
        name: "", // 头衔名称
        imgUrl: "", // 头衔图片
        levelRange: "", // 等级区间
        description: "", // 头衔描述
        id: ""
      },
      isNewAdd: true, // 是否新增
      rules: {
        name: [
          { required: true, message: "请输入头衔名称", trigger: "blur" },
          { max: 8, message: "头衔名称长度不能超过8个字符串", trigger: "blur" },
        ],
        imgUrl: [
          { required: true, message: "头衔图片不能为空", trigger: "blur" },
        ],
        levelRange: [
          { required: true, message: "请输入等级区间", trigger: "blur" },
          {pattern:/^[0-9]~[1,9]+$/,message:'只能输入(正整数~正整数)', trigger: "blur"},
          {
            max: 20,
            message: "等级区间长度不能超过20个字符串",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 新增
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchAddGardTitle(this.submitForm).then((res) => {
            if (res.data.code === 200) {
              // 清除表单
              this.resetForm(formName);
              this.$message.success("增加成功");
              this.getList(this.searchPage)
              this.dialogVisible = false
            } else {
              this.$message.error("增加失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.submitForm.name = "";
      this.submitForm.imgUrl = "";
      this.submitForm.levelRange = "";
      this.submitForm.description = "";
    },
    handleClose(done) {
      if (this.isNewAdd) {
        this.$confirm("确定关闭? (关闭后系统将自动保存为草稿)")
          .then((_) => {
            localStorage.setItem(
              "gardTitleData",
              JSON.stringify(this.submitForm)
            );
            done();
          })
          .catch((_) => {});
      } else {
        done();
      }
    },
    // 保存成功的回调
    closeCallBack() {
      // 关闭弹出框
      this.dialogVisible = false;
      // 刷新数据
      this.getList(this.searchPage);
    },
    // 添加头衔
    addGradTitle() {
      // 先从缓存中获取草稿数据
      let gardTitleData = localStorage.getItem("gardTitleData");
      if (gardTitleData && gardTitleData.length > 0) {
        this.submitForm = JSON.parse(gardTitleData);
      }
      this.submitForm.id = ""
      this.isNewAdd = true;
      this.tabTitle = "新增头衔";
      this.dialogVisible = true;
    },
    // 编辑
    editGardTitle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchSetGardTitle(this.submitForm).then((res) => {
            if (res.data.code === 200) {
              // 清除表单
              this.resetForm(formName);
              this.$message.success("保存成功");
              this.getList(this.searchPage)
              this.dialogVisible = false
            } else {
              this.$message.error("保存失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取头衔
    getGradTitle(id) {
      this.isNewAdd = false;
      this.tabTitle = "编辑头衔";
      this.dialogVisible = true;
      // 获取当前头衔
      this.$request.fetchGetGardTitle({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.submitForm = res.data.data;
          this.submitForm.id = res.data.data.id;
        } else {
          this.$message.error("获取头衔数据失败");
        }
      });
    },
    // 删除
    handleDelete(index, id) {
      this.$request.fetchDelGardTitle({ id: id }).then((res) => {
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
    // 头衔查询
    onSubmit() {
      this.getList(this.searchPage);
    },
    // 取消
    cancelDelete(index) {
      this.$set(this.visibleList, index, false);
      this.radio = 1;
    },
    // 获取列表
    getList(data) {
      this.$request.fetchGetGardTitleList(data).then((res) => {
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
    handleAvatarSuccess(res, file) {
      this.submitForm.imgUrl = res.msg;
      this.progressPercent = 100; // 防止图片上传成后进度条反应不过来
      setTimeout(() => {
        this.progressFlag = false;
      }, 1000);
    },
    beforeAvatarUpload(file) {
      this.progressFlag = false;
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (
        ["image/jpg", "image/png", "image/gif", "image/jpeg"].indexOf(
          file.type
        ) == -1
      ) {
        this.$message.error("上传图片只能是jpg|jpeg|png|gif格式!");
        return false;
      }
      if (!isLt8M) {
        this.$message.error("上传图片大小不能超过 8MB!");
        return false;
      }
    },
    uploadFileProcess(event, file, fileList) {
      fileList.forEach((item) => {
        console.log(item.percentage);
        if (item.percentage === 100) {
        } else {
          this.progressFlag = true;
          this.progressPercent = Math.abs(item.percentage.toFixed(0));
        }
      });
    },
  },
  mounted() {
    this.getList(this.searchPage);
  },
  watch: {
    "searchPage.name": {
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 80px;
  display: block;
}
.up-desc {
  font-size: 14px;
  color: #999999;
}
.progress-box {
  width: 200px;
}
</style>