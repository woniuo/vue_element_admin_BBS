<template>
    <div>
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
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "注册用户",
            type: "line",
            stack: "总量",
            data: [82, 63, 50, 43, 34, 23, 11]
          },
          {
            name: "玩家攻略",
            type: "line",
            stack: "总量",
            data: [22, 38, 19, 23, 49, 33, 11]
          },
          {
            name: "心情故事",
            type: "line",
            stack: "总量",
            data: [25, 43, 50, 25, 69, 53, 64]
          },
          {
            name: "玩家动态",
            type: "line",
            stack: "总量",
            data: [53, 73, 93, 63, 53, 43, 13]
          },
          {
            name: "玩家评论",
            type: "line",
            stack: "总量",
            data: [88, 19, 59, 73, 29, 33, 82]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
