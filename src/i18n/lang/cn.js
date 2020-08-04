/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */
import zhLocale from "element-ui/lib/locale/lang/zh-CN"
const cn = {
  routeName: {
    home: "主页",
    userManage: "用户管理", // 用户相关
    userList: "用户列表",
    forumManage: "论坛管理", // 论坛相关
    officialStrategyManage: "官方攻略管理",
    officialStrategyPublish: "官方攻略发布",
    officialStrategyList: "官方攻略列表",
    strategyManage: "攻略管理",
    strategyPublish: "攻略发布",
    strategyList: "攻略列表",
    storyList: "故事列表",
    dynamicList: "动态列表",
    reportManage: "举报管理",
    reportList: "举报列表",
    reportType: "举报类型",
    commentManage: "评论管理", // 评论相关
    strategyCommentList: "攻略评论列表",
    storyCommentList: "故事评论列表",
    dynamicCommentList: "动态评论列表",
    messageManage: "消息管理", // 消息相关
    announcementManage: "公告管理",
    announcementPublish: "公告发布",
    announcementList: "公告列表",
    announcementLook: "公告查看",
    announcementEdit: "公告编辑",
    systemMessageManage: "系统消息管理",
    systemMessagePublish: "系统消息发布",
    systemMessageList: "系统消息列表",
    newsManage: "新闻管理", // 新闻相关
    newsPublish: "新闻发布",
    newsList: "新闻列表",
    gameManage: "游戏管理", // 游戏相关
    gameList: "游戏列表",
    gameType: "游戏类型",
    giftBagManage: "礼包管理", // 礼包相关
    giftBagAdd: "新增礼包",
    giftBagList: "礼包列表",
    gardManage: "等级管理", // 等级相关
    integralManage: "积分任务管理",
    gardTitle: "头衔列表",
    feedbackManage: "反馈管理", // 反馈相关
    feedbackList: "反馈列表",
    feedbackType: "反馈类型",
    activeManage: "活动公告管理", // 活动公告相关
    activeAdd: "活动公告发布",
    activeList: "活动公告列表",
    adManage: "广告管理", // 广告相关
    adPublish: "广告发布",
    adList: "广告列表",
    systemManage: "系统管理", // 系统相关
    roleManage: "角色管理",
    aUserManage: "用户管理",
    aUserList: "用户列表"
  },
  rightMenu: {
    close: "关闭",
    closeOther: "关闭其他",
    closeAll: "全部关闭"
  },
  role: {
    superAdmin: "超级管理员",
    admin: "管理员",
    ordinary: "普通用户"
  },
  userDropdownMenu: {
    basicInfo: "基本资料",
    changePassword: "修改密码",
    logout: "退出"
  },

  ...zhLocale //  合并element-ui内置翻译
}

export default cn
