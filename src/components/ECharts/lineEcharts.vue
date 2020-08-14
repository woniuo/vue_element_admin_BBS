<template>
    <div class="hide-relative">
      <div v-if="loading" class="hide-loading loading">
          <span class="el-icon-loading big-loading"></span>
        </div>
      <div :id="id" :style="{width: width, height: height}"></div>
    </div>
</template>

<script>
import westeros from "./theme/westeros"
export default {
  name: "lineEcharts",
  props: {
    id: {
      type: String,
      default: "myChart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  data () {
    return {
      chart: null,
      echartData: [
        {
          dayList: ['01','02','03','04','05','06','7'],
          registerList: [0,0,0,0,0,0,0], // 注册初始数据
          strategyList: [0,0,0,0,0,0,0], // 攻略初始数据
          storyList: [0,0,0,0,0,0,0], // 故事初始数据
          photoList: [0,0,0,0,0,0,0], // 动态初始数据
          commentList: [0,0,0,0,0,0,0], // 评论初始数据
        }
      ], // 主表数据
      loading: false
    }
  },
  mounted () {
    this.getLineEcharts()
  },
  methods: {
    initChart () {
      let _this = this
      this.chart = this.$echarts.init(document.getElementById(this.id), "westeros")

      this.chart.setOption({
        title: {
          text: "数据折线图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["注册用户", "玩家攻略", "心情故事", "玩家动态", "玩家评论"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: _this.echartData.dayList
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "注册用户",
            type: "line",
            stack: "总量",
            data: _this.echartData.registerList
          },
          {
            name: "玩家攻略",
            type: "line",
            stack: "总量",
            data: _this.echartData.strategyList
          },
          {
            name: "心情故事",
            type: "line",
            stack: "总量",
            data: _this.echartData.storyList
          },
          {
            name: "玩家动态",
            type: "line",
            stack: "总量",
            data: _this.echartData.photoList
          },
          {
            name: "玩家评论",
            type: "line",
            stack: "总量",
            data: _this.echartData.commentList
          }
        ]
      })
    },
    // 获取图表数据
  getLineEcharts () {
    this.loading = true
    this.$request.fetchGetMainLineEcharts().then( res => {
      if (res.data.code === 200) {
          this.echartData = res.data.data
      } else {
        this.$messate.error("图形表数据加载失败")
      }
      this.initChart()
      this.loading = false
    })
  }
  },
}
</script>

<style scoped>

</style>
