<template>
  <div>
    <el-row>
      <el-col :span="4">
        菜单名:
        <el-input v-model="subData.name"></el-input>
      </el-col>
      <el-col :span="4">
        英文名:
        <el-input v-model="subData.enname"></el-input>
      </el-col>
      <el-col :span="4">
        说明:
        <el-input v-model="subData.description"></el-input>
      </el-col>
      <el-col :span="4">
        父节点id：
        <el-input v-model="subData.parentId"></el-input>
      </el-col>
      <el-col :span="4">
        是否为按钮:
        <el-input v-model="subData.isButton"></el-input>
      </el-col>
      <el-col :span="4">
        url:
        <el-input v-model="subData.url"></el-input>
      </el-col>
    </el-row>
    <el-row>
        <el-col>
            <el-button type="primary" @click="submit">确定</el-button>
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subData: {
        name: "",
        enname: "",
        description: "",
        parentId: null,
        url: "#",
        isButton: 2,
      },
    }
  },
  methods: {
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
    },
    submit() {
        this.subData.enname = this.randomWord(true, 5, 8)
        this.$request.fetchAddMenuButton(this.subData).then( res => {
            if (res.data.code === 200) {
                this.$message.success("新增成功")
            } else {
                this.$message.error("新增失败")
            }
        })
    }
  },
};
</script>
<style lang="scss" scoped>
</style>