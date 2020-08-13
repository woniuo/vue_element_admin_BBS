<template>
  <div>
    <el-row>
      <el-col align="right">
        <el-button type="primary" @click="addGood">新增物品</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :empty-text="emptyText">
      <el-table-column label="物品id" prop="propId" width="100" align="center"></el-table-column>
      <el-table-column label="物品名称" align="center">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.propName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="物品数量" align="center">
        <template slot-scope="scope">X{{ scope.row.propNum }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.propId)"
          >删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <el-dialog
        title="新增物品"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
      >
        <el-form
          :model="submitData"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="物品名称" prop="id">
            <el-select v-model="submitData.id" placeholder="请选择物品名称" @change="selectedGood">
              <el-option
                v-for="item in goodsList"
                :key="item.id"
                :label="item.id+'-'+item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物品数量" prop="propNum">
            <el-input-number v-model="submitData.propNum" :min="1" :max="900000" label="物品数量"></el-input-number>
          </el-form-item>
          <el-form-item align="right">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>
<script>
export default {
  name: "transfer",
  data() {
    return {
      emptyText: "加载中...",
      tableData: [], // 当前物品列表
      goodsList: [], // 所有物品列表
      dialogVisible: false,
      submitData: {
        giftId: null, // 礼包id
        id: null, // 物品id
        name: "", // 物品名称
        propNum: 0, // 物品数量
        type: null, // 不知道啥东西
      },
      rules: {
        propNum: [
          { required: true, message: "请输入物品数量", trigger: "change" },
        ],
        id: [{ required: true, message: "请选择物品名称", trigger: "change" }],
      },
    };
  },
  methods: {
    // 新增物品
    addGood() {
      this.dialogVisible = true;
      this.getGiftBagGoodsList(); // 获取所有物品列表
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.fetchAddGoods(this.submitData).then((res) => {
            if (res.data.code === 200) {
              // 插入数据
              this.tableData.push({
                propId: this.submitData.id,
                giftId: this.submitData.giftId,
                propName: this.submitData.name,
                propNum: this.submitData.propNum,
                type: null,
              });
              this.$message.success("增加物品成功");
              this.dialogVisible = false;
            } else {
              this.$message.error("增加物品失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      done();
    },
    handleDelete(index, id) {
      this.$request
        .fetchDelGoods({ giftId: this.submitData.giftId, id: id })
        .then((res) => {
          if (res.data.code === 200) {
            // 移除当前行
            this.tableData.splice(index, 1);
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        });
    },
    // 选择触发事件
    selectedGood(id) {
      // 根据当前选中的id查找当前对象
      this.goodsList.some((item, index) => {
        if (item.id === id) {
          this.submitData.name = item.name;
        }
      });
    },
    // 获取当前礼包物品列表
    getGiftBagGoods(id) {
      this.submitData.giftId = id;
      this.$request.fetchGetGoods({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error("数据获取失败");
        }
        this.emptyText = "暂无数据";
      });
    },
    // 获取所有物品列表
    getGiftBagGoodsList() {
      this.$request.fetchGetGoodsList().then((res) => {
        if (res.data.code === 200) {
          this.goodsList = res.data.data;
        } else {
          this.$message.error("数据获取失败");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>