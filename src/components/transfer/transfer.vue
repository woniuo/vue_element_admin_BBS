<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="物品数量" prop="propNum">
            <el-input-number v-model="ruleForm.propNum" :min="1" :max="900000" label="物品数量"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-transfer
      filterable
      filter-placeholder="请输入称号名称"
      :titles="['所有物品列表', '已添加物品列表']"
      :button-texts="['移除', '增加']"
      v-model="value"
      :data="data"
      :right-default-checked="selectedData"
      @change="handleChange"
      @left-check-change="leftChange"
      class="transfer"
    >
    </el-transfer>
  </div>
</template>
<script>
export default {
  name: "transfer",
  data() {
    return {
      ruleForm: {
        propNum: 0, // 物品数量
      },
      selectedData: [], // 右侧初始化物品数据
      data: [], // 左侧所有的物品
      value: [], // 右侧添加的物品
      rules: {
        propNum: [
          { required: true, message: "请输入物品数量", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(value, direction, movedKeys) {
      // 根据direction 的值判断是添加还是移除
      if (direction === "right") {
        let isSuccess = false;
        this.$message.error("增加失败");
        // 增加失败移除对应的物品
        this.value.some((item, index) => {
          // 移除
          console.log(item);
        });
      } else if (direction === "left") {
        let isSuccess = true;
        this.$message.success("移除成功");
      }
    },
    leftChange(key) {
      console.log(key);
    },
    // 获取当前礼包物品
    getGiftBagGoods(id) {
        this.$request.fetchGetGoods({id: id}).then( res => {
            if( res.data.code === 200) {
                console.log(res.data)
            }
        })
    }
  },
  created() {
    this.$request.fetchGetGoodsList().then((res) => {
      if (res.data.code === 200) {
        let getData = res.data.data;
        let dataArr = [];
        res.data.data.forEach((item, index) => {
          dataArr.push({
            label: item.name,
            key: item.id,
            getData: getData[index],
          });
        });
        this.data = dataArr;
      }
    });
  },
};
</script>
<style lang="scss" scoped>
</style>