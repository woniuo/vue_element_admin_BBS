<template>
  <div>
    <el-card>
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          v-for="(item, index) in dynamicValidateForm.report"
          label="类型"
          :key="index+Date.now()"
          :prop="'report.' + index + '.name'"
          :rules="{
      required: true, message: '类型名称不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="item.name" class="w400" clearable maxlength="15" show-word-limit></el-input>
          <el-button @click.prevent="removeDomain(item)" type="danger">删除</el-button>
        </el-form-item>
        <el-form-item v-if="lastReport && lastReport.length>0" :label="lastReport[0].name">
          <el-input v-model="lastReport[0].name" class="w400" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDomain">新增类型</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        report: [],
      },
      lastReport: [], // 其它
      reportPage: {
        name: '',
        page: 1,
        pageSize:20
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 排序
          let reportArr = this.dynamicValidateForm.report.concat(this.lastReport)
          reportArr.forEach((item, index) => {
            item.orderNum = index
          })
          this.$request.fetchAddUpReportType({'jsonArrStr':JSON.stringify(reportArr)}).then( res => {
            if(res.data.code === 200) {
              this.$message.success("保存成功")
            } else {
              this.$message.error("保存失败")
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 同时清除老的举报类型
      this.dynamicValidateForm.report.forEach((item) => {
        item.name = "";
      });
    },
    removeDomain(item) {
      this.$request.fetchDelReportType({id:item.id})
      .then( res => {
        if(res.data.code === 200) {
           let index = this.dynamicValidateForm.report.indexOf(item);
            if (index !== -1) {
              this.dynamicValidateForm.report.splice(index, 1);
            }
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      })
     
    },
    addDomain() {
      this.dynamicValidateForm.report.push({
        name: "",
        id: "",
        orderNum: null
      });
    },
    // 获取举报类型
    getReport(data) {
      this.$request.fetchGetReportType(data).then((res) => {
        if(res.data.code === 200) {
          // 过滤其它这个选项
          this.dynamicValidateForm.report = res.data.data.splice(0,res.data.data.length-1)
          this.lastReport = res.data.data.splice(-1)
        } else {
          this.$message.error("数据加载失败")
        }
      });
    },
  },
  mounted() {
    this.getReport(this.reportPage);
  },
};
</script>
<style lang="scss" scoped>
.w400 {
  width: 400px;
}
</style>