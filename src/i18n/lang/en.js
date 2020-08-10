/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */

import enLocale from "element-ui/lib/locale/lang/en"
const en = {
  routeName: {
    home: "home",
    userManage: "userManage", // 用户相关
    userList: "userList",
    forumManage: "forumManage", // 论坛相关
    officialStrategyManage: "officialStrategyManage",
    officialStrategyPublish: "officialStrategyPublish",
    officialStrategyList: "officialStrategyList",
    strategyManage: "strategyManage",
    strategyPublish: "strategyPublish",
    strategyList: "strategyList",
    storyList: "storyList",
    dynamicList: "dynamicList",
    reportManage: "reportManage",
    reportList: "reportList",
    reportType: "reportType",
    commentManage: "commentManage", // 评论相关
    strategyCommentList: "strategyCommentList",
    storyCommentList: "storyCommentList",
    dynamicCommentList: "dynamicCommentList",
    messageManage: "messageManage", // 消息相关
    announcementManage: "announcementManage",
    announcementPublish: "announcementPublish",
    announcementList: "announcementList",
    announcementLook: "announcementLook",
    announcementEdit: "announcementEdit",
    systemMessageManage: "systemMessageManage",
    systemMessagePublish: "systemMessagePublish",
    systemMessageList: "systemMessageList",
    newsManage: "newsManage", // 新闻相关
    newsPublish: "newsPublish",
    newsList: "newsList",
    gameManage: "gameManage", // 游戏相关
    gameList: "gameList",
    gameType: "gameType",
    giftBagManage: "giftBagManage", // 礼包相关
    giftBagAdd: "giftBagAdd",
    giftBagList: "giftBagList",
    gardManage: "gardManage", // 等级相关
    integralManage: "integralManage",
    gardTitle: "gardTitle",
    feedbackManage: "feedbackManage", // 反馈相关
    feedbackList: "feedbackList",
    feedbackType: "feedbackType",
    activeManage: "activeManage", // 活动公告相关
    activeAdd: "activeAdd",
    activeEdit: "activeEdit",
    activeList: "activeList",
    adManage: "adManage", // 广告相关
    adPublish: "adPublish",
    adEdit: "adEdit",
    adList: "adList",
    systemManage: "systemManage", // 系统相关
    roleManage: "roleManage",
    aUserManage: "aUserManage",
    aUserList: "aUserList"
  },
  rightMenu: {
    close: "close",
    closeOther: "closeOther",
    closeAll: "closeAll"
  },
  role: {
    superAdmin: "superAdmin",
    admin: "admin",
    ordinary: "ordinary"
  },
  userDropdownMenu: {
    basicInfo: "basicInfo",
    changePassword: "changePassword",
    logout: "logout"
  },

  ...enLocale //  合并element-ui内置翻译
}

export default en
