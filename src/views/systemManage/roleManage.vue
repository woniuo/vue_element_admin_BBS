<template>
  <div class="cardshadow roleListTable">
    <div>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="addRole"
        plain
        v-role-btn="'106'"
      >新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column property="name" label="角色名" align="center"></el-table-column>
      <el-table-column property="description" label="角色描述" align="center"></el-table-column>
      <el-table-column prop="roleCondition" label="状态" filter-placement="bottom-end" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.roleCondition === true" type="primary">启 用</el-tag>
          <el-tag v-else type="danger">禁 用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.name=='超级管理员'"
            @click="handleEdit(scope.$index, scope.row)"
            v-role-btn="'107'"
          >编辑</el-button>
          <el-button
            size="mini"
            :disabled="scope.row.name=='超级管理员'"
            @click="roleEdit(scope.$index, scope.row)"
            v-role-btn="'108'"
          >权限分配</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.name=='超级管理员'"
            @click="handleDelete(scope.$index, scope.row)"
            v-role-btn="'109'"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色信息" width="700px" class="dialog1" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            type="text"
            placeholder="请输入角色名称"
            maxlength="10"
            show-word-limit
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="ruleForm.description"
            placeholder="请输入角色描述"
            type="textarea"
            maxlength="50"
            show-word-limit
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否开启" prop="roleCondition">
          <el-switch v-model="ruleForm.roleCondition"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
        <el-button type="primary" @click="addRoleSubmit('ruleForm')" >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="权限分配"
      class="dialog2"
      @opened="setRoleData"
      :visible.sync="dialogFormVisible2"
    >
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom: 20px"></el-input>
      <el-row>
        <el-col align="right">
          <el-button type="primary" size="mini" @click="isOpenAll">展开/关闭</el-button>
        </el-col>
      </el-row>
      <el-tree
        :data="roleTree"
        node-key="r_id"
        show-checkbox
        check-on-click-node
        :default-expand-all="isSpreadAll"
        highlight-current
        :expand-on-click-node="false"
        ref="permission"
        :filter-node-method="filterNode"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="rolePermissionSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roleManage",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      isEdit: false, // 是否为编辑角色
      ruleForm: {
        description: "", // 简介
        enname: "", // 后端要的
        name: "", // 角色名
        parentId: 0, // 后端说的父节点id
        roleCondition: true, // 是否启用
      },
      defaultProps: {
        children: "children",
        label: "r_name",
        id: "r_id",
      },
      selectRoleId: "",
      selectData: [],
      filterText: "",
      isSpreadAll: true, // 是否展开所有权限
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        roleCondition: [
          { required: true, message: "请选择是否启用", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    isOpenAll() {
      if (this.isSpreadAll) {
        this.isSpreadAll = false;
        for (
          var i = 0;
          i < this.$refs.permission.store._getAllNodes().length;
          i++
        ) {
          this.$refs.permission.store._getAllNodes()[
            i
          ].expanded = this.isSpreadAll;
        }
      } else {
        this.isSpreadAll = true; //展开所有节点
        for (
          var i = 0;
          i < this.$refs.permission.store._getAllNodes().length;
          i++
        ) {
          this.$refs.permission.store._getAllNodes()[
            i
          ].expanded = this.isSpreadAll;
        }
      }
    },
    handleEdit(index, row) {
      // 获取当前角色信息
      this.$request.fetchGetRole({roleId: row.id}).then( res => {
        if (res.data.code === 200) {
          let {id, description, enname, name, parentId, roleCondition} = res.data.data
          this.ruleForm = {id, description, enname, name, parentId, roleCondition}
          this.getList()
        } else {
          this.$message.error("数据加载失败")
        }
      })
      this.isEdit = true
      this.dialogFormVisible = true;
    },
    addRole() {
      this.ruleForm = {
        description: "", // 简介
        enname: "", // 后端要的
        name: "", // 角色名
        parentId: 0, // 后端说的父节点id
        roleCondition: true, // 是否启用
      };
      this.isEdit = false
      this.dialogFormVisible = true;
    },
    addRoleSubmit(formName) {
      if (!this.isEdit) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            // 增加一个外国名
            if (!this.ruleForm.enname) {
              this.ruleForm.enname = this.randomWord(true, 5, 10)
            }
            if (this.ruleForm.name === "超级管理员") {
              this.$message.error("超级管理员只能有一个!")
              return false
            }
            this.$request.fetchAddRole(this.ruleForm).then( res => {
              if (res.data.code === 200) {
                this.dialogFormVisible = false
                this.getList()
                this.$message.success("增加成功")
              } else {
                this.$message.error("增加失败")
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.fetchEditRole(this.ruleForm).then( res => {
              if (res.data.code === 200) {
                this.dialogFormVisible = false
                this.getList()
                this.$message.success("修改成功")
              } else {
                this.$message.error("修改失败")
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.description = ""
    },
    rolePermissionSubmit() {
      let rolePermissionData = {
        permissionIds: this.$refs.permission.getCheckedKeys().toString(),
        roleId: this.selectRoleId,
      };
      this.$request
        .fetchRolePermissions(rolePermissionData)
        .then((res) => {
          if (res.data.code === 200) {
              this.$restBack(res.data, () => {
              this.$message.success("修改成功")
              this.dialogFormVisible2 = false;
              this.getList();
            });
          } else {
            this.$message.error("修改失败")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    roleEdit(index, row) {
      console.log(index, row);
      this.selectRoleId = row.id;
      this.selectData = row.permission ? row.permission.split(",") : [];
      this.dialogFormVisible2 = true;
    },
    setRoleData() {
      this.$request
        .fetchSearchRolePermissions({ roleId: this.selectRoleId })
        .then((res) => {
            if (res.data.code === 200) {
              this.$refs.permission.setCheckedKeys([]);
              let permissionData =
                res.data.data.menuArr + "," + res.data.data.buttonArr;
              this.$refs.permission.setCheckedKeys(permissionData.split(","));
            } else {
              this.$message.error("数据加载失败")
            }
        });
    },
    handleDelete(index, row) {
      let that = this;
      this.$request
        .fetchDelRole({
          roleId: row.id,
        })
        .then( res => {
          if (res.data.code === 200) {
            this.tableData.splice(index, 1)
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error("删除失败")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList() {
      this.$request
        .fetchGetRoleList()
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data;
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.r_name.indexOf(value) !== -1;
    },
    // 随机生成由字母+数字的字符串
    randomWord (randomFlag, min, max) {
      // randomFlag: Boolean 是否随机个数
      // min 最少个数
      // max 最大个数
      var str = ""
      var range = min
      var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min
      }
      var pos = ""
      for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1))
        str += arr[pos]
      }
      return str
    }
  },
  watch: {
    filterText(val) {
      this.$refs.permission.filter(val);
    },
  },
  computed: {
    roleTree: function () {
      let roleData = this.$store.getters.roleData;
      console.log(roleData)
      for (let i = 0; i < roleData.length; i++) {
        if (roleData[i].redirect === "/404") {
          roleData.splice(i, 1);
        }
      }
      return roleData;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.nameinput {
  width: 150px;
}

.phoneinput {
  width: 120px;
}

.datepicker {
  width: 260px;
}
.dialog1 .el-dialog {
  width: 35%;
}

.dialog1 .el-dialog .el-form {
  width: 500px;
  margin: 0 auto;
}

.el-form-item__content {
  margin-left: 120px;
  width: 300px;
}
</style>

