import en from "../i18n/lang/en"
import cn from "../i18n/lang/cn"
import Vue from "vue"
import Router from "vue-router"
import Login from "@/views/login/index"
import Layout from "@/views/layout/layout"
import HomeMain from "@/views/index/mainIndex"

// 不是必须加载的组件使用懒加载
const NotFound = () => import("@/views/page404")

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
let routeName = en.routeName
let roleName = cn.routeName
let defaultRouter = [
  { path: "/",
    redirect: "/index",
    hidden: true,
    children: []
  },
  {
    path: "/login",
    component: Login,
    name: "",
    hidden: true,
    children: []
  },
  {
    path: "/index",
    iconCls: "fa fa-dashboard", // 图标样式class
    name: routeName.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/index",
        iconCls: "fa fa-dashboard", // 图标样式class
        name: "主页",
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
]

let addRouter = [
  {
    r_id: 1001,
    r_name: roleName.userManage, // 用户管理
    path: "/userManage",
    iconCls: "fa fa-user-circle", // 图标样式class
    name: "userManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1002,
        r_name: roleName.userList, // 用户列表
        path: "/userList",
        iconCls: "el-icon-edit-outline",
        name: "userList",
        component: () => import("@/views/user/userList"),
        children: [
          {
            r_id: 80,
            r_name: "btn:状态修改",
            path: "",
            type: "button",
            children: []
          },
          {
            r_id: 53,
            r_name: "btn:查看",
            path: "",
            type: "button",
            children: []
          },
          {
            r_id: 54,
            r_name: "btn:编辑",
            path: "",
            type: "button",
            children: []
          },
          {
            r_id: 55,
            r_name: "btn:删除",
            path: "",
            type: "button",
            children: []
          }
        ]
      }
    ]
  },
  {
    r_id:  12,
    r_name: roleName.forumManage, // 论坛管理
    path: "/forumManage",
    iconCls: "fa fa-comments",
    name: "forumManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 13,
        r_name: roleName.officialStrategyManage, // 官方攻略管理
        path: "/officialStrategyManage",
        iconCls: "iconfont icon-gonglve",
        name: "officialStrategyManage",
        component: () => import("@/views/forumManage/index"),
        children: [
          {
            r_id: 14,
            r_name: roleName.officialStrategyPublish, // 攻略发布
            path: "/officialStrategyPublish",
            iconCls: "iconfont icon-fabu",
            name: "officialStrategyPublish",
            component: () => import("@/views/forumManage/strategyManage/strategyPublish"),
            children: []
          },
          {
            r_id: 15,
            r_name: roleName.officialStrategyList, // 攻略列表
            path: "/officialStrategyList",
            iconCls: "el-icon-edit-outline",
            name: "officialStrategyList",
            component: () => import("@/views/forumManage/strategyManage/strategyList"),
            children: []
          }
        ]
      },
      {
        r_id: 16,
        r_name: roleName.strategyList, // 攻略列表
        path: "/strategyList",
        iconCls: "el-icon-edit-outline",
        name: "strategyList",
        component: () => import("@/views/forumManage/strategyList"),
        children: []
      },
      {
        r_id: 17,
        r_name: roleName.storyList, // 故事列表
        path: "/storyList",
        iconCls: "el-icon-edit-outline",
        name: "storyList",
        component: () => import("@/views/forumManage/storyList"),
        children: []
      },
      {
        r_id: 18,
        r_name: roleName.dynamicList, // 动态列表
        path: "/dynamicList",
        iconCls: "el-icon-edit-outline",
        name: "dynamicList",
        component: () => import("@/views/forumManage/dynamicList"),
        children: []
      },
      {
        r_id: 1009,
        r_name: roleName.reportManage, // 举报管理
        path: "/reportManage",
        iconCls: "iconfont icon-gonglve",
        name: "reportManage",
        component: () => import("@/views/forumManage/index"),
        children: [
          {
            r_id: 1010,
            r_name: roleName.reportList, // 举报列表
            path: "/reportList",
            iconCls: "el-icon-edit-outline",
            name: "reportList",
            component: () => import("@/views/forumManage/reportManage/reportList"),
            children: []
          },
          {
            r_id: 1011,
            r_name: roleName.reportType, // 举报类型
            path: "/reportType",
            iconCls: "iconfont icon-4leixing",
            name: "reportType",
            component: () => import("@/views/forumManage/reportManage/reportType"),
            children: []
          }
        ]
      }
    ]
  },
  {
    r_id: 1012,
    r_name: roleName.commentManage, // 评论管理
    path: "/commentManage",
    iconCls: "fa fa-commenting",
    name: "commentManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1013,
        r_name: roleName.strategyCommentList, // 攻略评论列表
        path: "/strategyCommentList",
        iconCls: "el-icon-edit-outline",
        name: "strategyCommentList",
        component: () => import("@/views/commentManage/strategyCommentList"),
        children: []
      },
      {
        r_id: 1014,
        r_name: roleName.storyCommentList, // 故事评论列表
        path: "/storyCommentList",
        iconCls: "el-icon-edit-outline",
        name: "storyCommentList",
        component: () => import("@/views/commentManage/storyCommentList"),
        children: []
      },
      {
        r_id: 1015,
        r_name: roleName.dynamicCommentList, // 动态评论列表
        path: "/dynamicCommentList",
        iconCls: "el-icon-edit-outline",
        name: "dynamicCommentList",
        component: () => import("@/views/commentManage/dynamicCommentList"),
        children: []
      }
    ]
  },
  {
    r_id: 1016,
    r_name: roleName.messageManage, // 消息管理
    path: "/messageManage",
    iconCls: "fa fa-bell",
    name: "messageManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1017,
        r_name: roleName.announcementManage, // 公告管理
        path: "/announcementManage",
        iconCls: "fa iconfont icon-lujing",
        name: "announcementManage",
        component: () => import("@/views/messageManage/index"),
        children: [
          {
            r_id: 1018,
            r_name: roleName.announcementPublish, // 公告发布
            path: "/announcementPublish",
            iconCls: "fa iconfont icon-fabu",
            name: "announcementPublish",
            component: () => import("@/views/messageManage/announcementManage/announcementPublish"),
            children: []
          },
          {
            r_id: 10181,
            r_name: roleName.announcementEdit, // 公告发布
            path: "/announcementEdit",
            iconCls: "fa iconfont icon-fabu",
            name: "announcementEdit",
            component: () => import("@/views/messageManage/announcementManage/announcementEdit"),
            hidden: true,
            children: []
          },
          {
            r_id: 1019,
            r_name: roleName.announcementList, // 公告列表
            path: "/announcementList",
            iconCls: "el-icon-edit-outline",
            name: "announcementList",
            component: () => import("@/views/messageManage/announcementManage/announcementList"),
            children: []
          },
        ]
      },
      {
        r_id: 1020,
        r_name: roleName.systemMessageManage, // 系统消息管理
        path: "/systemMessageManage",
        iconCls: "fa iconfont icon-lujing",
        name: "systemMessageManage",
        component: () => import("@/views/messageManage/index"),
        children: [
          {
            r_id: 1021,
            r_name: roleName.systemMessagePublish, // 系统消息发布
            path: "/systemMessagePublish",
            iconCls: "fa iconfont icon-fabu",
            name: "systemMessagePublish",
            component: () => import("@/views/messageManage/systemMessageManage/systemMessagePublish"),
            children: []
          },
          {
            r_id: 1022,
            r_name: roleName.systemMessageList, // 系统消息列表
            path: "/systemMessageList",
            iconCls: "el-icon-edit-outline",
            name: "systemMessageList",
            component: () => import("@/views/messageManage/systemMessageManage/systemMessageList"),
            children: []
          },
        ]
      }
    ]
  },
  {
    r_id: 1023,
    r_name: roleName.newsManage, // 新闻管理
    path: "/newsManage",
    iconCls: "fa fa-globe",
    name: "newsManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1024,
        r_name: roleName.newsPublish, // 新闻发布
        path: "/newsPublish",
        iconCls: "fa iconfont icon-fabu",
        name: "newsPublish",
        component: () => import("@/views/newsManage/newsPublish"),
        children: []
      },
      {
        r_id: 1025,
        r_name: roleName.newsList, // 新闻列表
        path: "/newsList",
        iconCls: "el-icon-edit-outline",
        name: "newsList",
        component: () => import("@/views/newsManage/newsList"),
        children: []
      }
    ]
  },
  {
    r_id: 1026,
    r_name: roleName.gameManage, // 游戏管理
    path: "/gameManage",
    iconCls: "fa fa-gamepad",
    name: "gameManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1027,
        r_name: roleName.gameList, // 游戏列表
        path: "/gameList",
        iconCls: "el-icon-edit-outline",
        name: "gameList",
        component: () => import("@/views/gameManage/gameList"),
        children: []
      },
      {
        r_id: 1028,
        r_name: roleName.gameType, // 游戏类型
        path: "/gameType",
        iconCls: "fa iconfont icon-4leixing",
        name: "gameType",
        component: () => import("@/views/gameManage/gameType"),
        children: []
      },
    ]
  },
  {
    r_id: 1029,
    r_name: roleName.giftBagManage, // 礼包管理
    path: "/giftBagManage",
    iconCls: "fa fa-gift",
    name: "giftBagManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1030,
        r_name: roleName.giftBagAdd, // 新增礼包
        path: "/giftBagAdd",
        iconCls: "fa iconfont icon-xinzeng",
        name: "giftBagAdd",
        component: () => import("@/views/giftBagManage/giftBagAdd"),
        children: []
      },
      {
        r_id: 10301,
        r_name: roleName.giftBagEdit, // 新增礼包
        path: "/giftBagEdit",
        iconCls: "fa iconfont icon-xinzeng",
        name: "giftBagEdit",
        component: () => import("@/views/giftBagManage/giftBagEdit"),
        hidden: true,
        children: []
      },
      {
        r_id: 1031,
        r_name: roleName.giftBagList, // 礼包列表
        path: "/giftBagList",
        iconCls: "el-icon-edit-outline",
        name: "giftBagList",
        component: () => import("@/views/giftBagManage/giftBagList"),
        children: []
      }
    ]
  },
  {
    r_id: 1032,
    r_name: roleName.gardManage, // 等级管理
    path: "/gardManage",
    iconCls: "fa iconfont icon-dengji",
    name: "gardManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1033,
        r_name: roleName.integralManage, // 等级管理
        path: "/integralManage",
        iconCls: "fa iconfont icon-ziyuanzhongxin",
        name: "integralManage",
        component: () => import("@/views/gardManage/integralManage"),
        children: []
      },
      {
        r_id: 1034,
        r_name: roleName.gardTitle, // 头衔列表
        path: "/gardTitle",
        iconCls: "el-icon-edit-outline",
        name: "gardTitle",
        component: () => import("@/views/gardManage/gardTitle"),
        children: []
      }
    ]
  },
  {
    r_id: 1035,
    r_name: roleName.feedbackManage, // 反馈管理
    path: "/feedbackManage",
    iconCls: "fa iconfont icon-yijianfankui",
    name: "feedbackManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1036,
        r_name: roleName.feedbackList, // 反馈列表
        path: "/feedbackList",
        iconCls: "el-icon-edit-outline",
        name: "feedbackList",
        component: () => import("@/views/feedbackManage/feedbackList"),
        children: []
      },
      {
        r_id: 1037,
        r_name: roleName.feedbackType, // 反馈类型
        path: "/feedbackType",
        iconCls: "fa iconfont icon-4leixing",
        name: "feedbackType",
        component: () => import("@/views/feedbackManage/feedbackType"),
        children: []
      }
    ]
  },
  {
    r_id: 1038,
    r_name: roleName.activeManage, // 活动公告管理
    path: "/activeManage",
    iconCls: "fa iconfont icon-huodong",
    name: "activeManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1039,
        r_name: roleName.activeAdd, // 活动公告发布
        path: "/activeAdd",
        iconCls: "fa iconfont icon-fabu",
        name: "activeAdd",
        component: () => import("@/views/activeManage/activeAdd"),
        children: []
      },
      {
        r_id: 10391,
        r_name: roleName.activeEdit, // 活动公告编辑
        path: "/activeEdit",
        iconCls: "fa iconfont icon-fabu",
        name: "activeEdit",
        component: () => import("@/views/activeManage/activeEdit"),
        hidden: true,
        children: []
      },
      {
        r_id: 1040,
        r_name: roleName.activeList, // 活动公告列表
        path: "/activeList",
        iconCls: "el-icon-edit-outline",
        name: "activeList",
        component: () => import("@/views/activeManage/activeList"),
        children: []
      },
    ]
  },
  {
    r_id: 1041,
    r_name: roleName.adManage, // 广告管理
    path: "/adManage",
    iconCls: "fa iconfont icon-guanggao",
    name: "adManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 10410,
        r_name: roleName.adPublish, // 广告发布
        path: "/adPublish",
        iconCls: "fa iconfont icon-fabu",
        name: "adPublish",
        component: () => import("@/views/adManage/adPublish"),
        children: []
      },
      {
        r_id: 10411,
        r_name: roleName.adEdit, // 广告编辑
        path: "/adEdit",
        iconCls: "fa iconfont icon-fabu",
        name: "adEdit",
        component: () => import("@/views/adManage/adEdit"),
        hidden: true,
        children: []
      },
      {
        r_id: 10412,
        r_name: roleName.adList, // 广告列表
        path: "/adList",
        iconCls: "el-icon-edit-outline",
        name: "adList",
        component: () => import("@/views/adManage/adList"),
        children: []
      },
    ]
  },
  {
    r_id: 1042,
    r_name: roleName.systemManage, // 系统管理
    path: "/systemManage",
    iconCls: "fa iconfont icon-xitong",
    name: "systemManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 1043,
        r_name: roleName.roleManage,
        path: "/roleManage",
        iconCls: "el-icon-edit-outline", // 角色管理
        name: "roleManage",
        component: () => import("@/views/systemManage/roleManage"),
        children: [
          {
            r_id: "39",
            r_name: "btn:增加",
            path: "",
            type: "button",
            children: []
          }
        ]
      },
      {
        r_id: 1044,
        r_name: roleName.userManage, // 系统用户管理
        path: "/auser",
        iconCls: "el-icon-tickets",
        name: "userManage",
        component: () => import("@/views/commerViews"),
        children: [
          {
            r_id: 1045,
            r_name: roleName.aUserList,
            path: "/aUserList",
            iconCls: "el-icon-edit-outline",
            name: "aUserList",
            component: () => import("@/views/systemManage/aUserList"),
            children: []
          },
          {
            r_id: 111111,
            r_name: roleName.addRole,
            path: "/addRole",
            iconCls: "el-icon-edit-outline",
            name: "addRole",
            component: () => import("@/views/systemManage/addRole"),
            children: []
          }
        ]
      },
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
    children: []
  }
]

export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
