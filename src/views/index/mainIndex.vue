<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card kjfs">
          <p class="title"><i class="fa fa-th-large fa-lg"></i>快捷方式</p>
          <ul>
            <li><router-link to="/officialStrategyPublish" class="kjfs kjfs-bluee"><span><i class="el-icon-tickets fa-2x"></i></span><span>发布攻略</span></router-link></li>
            <li><router-link to="/newsPublish" class="kjfs kjfs-pinkk"><span><i class="fa iconfont icon-quanbuxinwen fa-2x"></i></span><span>发布新闻</span></router-link></li>
            <li><router-link to="/announcementPublish" class="kjfs kjfs-grennn"><span><i class="fa iconfont icon-lujing fa-2x"></i></span><span>发布公告</span></router-link></li>
          </ul>
          <ul>
            <li><router-link to="/giftBagList" class="kjfs kjfs-lightBluee"><span><i class="fa fa-gift fa-2x"></i></span><span>礼包管理</span></router-link></li>
            <li><router-link to="/feedbackList" class="kjfs kjfs-purplee"><span><i class="fa iconfont icon-yijianfankui fa-2x"></i></span><span>用户反馈</span></router-link></li>
            <li><router-link to="/roleManage" class="kjfs kjfs-yelloww"><span><i class="fa fa-universal-access fa-2x"></i></span><span>权限管理</span></router-link></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card dbsx">
          <p class="title"><i class="fa fa-file-text-o"></i>待办事项</p>
          <ul class="hide-relative">
              <div v-if="loading" class="hide-loading loading">
                <span class="el-icon-loading big-loading"></span>
              </div>
             <li><router-link to="#" class="daiban tz"><span>待审帖子</span><span class="num">{{toDoData.invitation}}</span></router-link></li>
            <li><router-link to="#" class="daiban jb"><span>待看举报</span><span class="num">{{toDoData.report}}</span></router-link></li>
            <li><router-link to="#" class="daiban fk"><span>待看反馈</span><span class="num">{{toDoData.feedback}}</span></router-link></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-server"></i>版本信息</p>
          <div class="table">
            <p><span class="tit">当前版本</span>v1.0.0</p>
            <p><span class="tit">基于框架</span>vue2.0全家桶 + element-ui</p>
            <p><span class="tit">主要特色</span>单页面 / 响应式 / 无限级菜单 / 权限管理 / 极简</p>
            <p><span class="tit">版权所有</span>Copyright © 2020 江西优服科技有限公司-岂会玩吧</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <line-echarts id="lineEcharts" height="300px" ref="echarts"></line-echarts>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <maintable id="maintable"></maintable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineEcharts from "../../components/ECharts/lineEcharts"
import Maintable from "./common/maintable"
export default {
  name: "mainIndex",
  data () {
    return {
      toDoData: {
         feedback: 0, // 待看反馈
         invitation: 0 , // 待审帖子
         report: 0 // 待看举报
      },
      loading: false
    }
  },
  components: {Maintable, LineEcharts},
  mounted () {
    this.selfAdaption()
    this.getMainToDo()
  },
  methods: {
    // echart自适应
    selfAdaption () {
      let that = this
      setTimeout(() => {
        window.onresize = function () {
          if (that.$refs.echarts) {
            that.$refs.echarts.chart.resize()
          }
        }
      }, 10)
    },
    // 获取代办数据
    getMainToDo () {
      this.loading = true
      this.$request.fetchGetMainToDo().then( res => {
        if (res.data.code === 200) {
          this.toDoData  = res.data.data
        } else {
          this.$message.error("代办事项数据加载失败")
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
  $top:top;
  $bottom:bottom;
  $left:left;
  $right:right;
  $leftright: ($left, $right);
  $pinkk: #eec2d3;
  $bluee: #409eff;
  $yelloww: #f4d884;
  $grennn: #89dda0;
  $purplee: #78a2ea;
  $lightBluee: #f66f6a;

  $list: bluee pinkk yelloww grennn purplee lightBluee;
  $list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
  %shadow{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
    .title{
      font-size: 14px;
      padding: 10px;
      i{
        margin-#{$right}: 5px;
      }
    }
  }

  @mixin flex($direction:row,$content:space-between){
    display: flex;
    flex-direction: $direction;
    justify-content: $content;
  }
  .card{
    color: #666;
    @extend %shadow;

    ul{
      @include flex;
      li{
        flex: 1;
        a{
          color: #666666;
          align-items:center;
          padding-#{$top}: 20px;
          padding-#{$bottom}: 20px;
          @include flex(column);
          span{
            height: 44px;
          }
          .num{
            line-height: 44px;
            font-size: 42px;
            color: $bluee;
            margin: 0px;
          }
        }
        .daiban {
          padding: 84px 0px;
        }
         &:hover {
            .tz {
              background: #dbc09b;
              color: #ffffff;
            }
            .num {
              color: #ffffff;
            }
            .jb {
              background: #dbc09b;
              color: #ffffff;
            }
            .fk {
              background: #dbc09b;
              color: #ffffff;
            }
          }
        .kjfs-bluee{
          color: $bluee;
        }
        .kjfs-pinkk{
          color: $pinkk;
        }
        .kjfs-yelloww{
          color: $yelloww;
        }
        .kjfs-grennn{
          color: $grennn;
        }
        .kjfs-purplee{
          color: $purplee;
        }
        .kjfs-lightBluee{
          color: $lightBluee;
        }
        &:hover{
          .kjfs-bluee{
            color: #ffffff;
            background: $bluee;
          }
          .kjfs-pinkk{
            color: #ffffff;
            background: $pinkk;
          }
          .kjfs-yelloww{
            color: #ffffff;
            background: $yelloww;
          }
          .kjfs-grennn{
            color: #ffffff;
            background: $grennn;
          }
          .kjfs-purplee{
            color: #ffffff;
            background: $purplee;
          }
          .kjfs-lightBluee{
            color: #ffffff;
            background: $lightBluee;
          }
        }
      }
    }
    .table{
      padding: 21px;
      p{
        height: 52px;
        line-height: 52px;
        border: 1px solid #cccccc;
        overflow: hidden;
        border-#{$top}: none;
        @include flex( null,start);
        &:first-child{
          border-#{$top}: 1px solid #cccccc;
        }
        .tit{
          width: 90px;
          min-width: 90px;
          height: 100%;
          text-align: center;
          border-#{$right}: 1px solid #cccccc;
          margin-#{$right}: 18px;
        }
        span.gitbox{
          flex: 1;
          height: 100%;
          overflow: hidden;
          @include flex(row,start);
          a{
            &:first-child{
              margin-#{$right}: 30px;
            }
          }
        }
      }
    }
  }
  #lineEcharts{
    margin-#{$top}: 30px;
    padding-#{$top}: 30px;
    @extend %shadow;
  }
  #maintable{
    margin-#{$top}: 30px;
    padding-#{$top}: 10px;
    @extend %shadow;
  }
</style>
