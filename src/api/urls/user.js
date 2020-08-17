/**
 * Created by WebStorm.
 * User: woniuo
 * Date: 2020/4/20
 * Description: 文件描述
 */
export default {
  // 获取主页代办数据
  getMainToDo: "/mainPage/readyDo",
  // 获取主页图表数据
  getMainLineEcharts: "/mainPage/image",
  // 获取主页最新待审数据
  getMainPending: "/mainPage/approval",
  // ==============后台相关================
  // 注册/添加账号
  register: "/tbuser/insertTbUser",
  // 删除系统用户
  delUser: "/tbuser/deleteTbUser",
  // 修改系统用户信息
  editUser: "/tbuser/updateTbUser",
  // 获取当前系统用户信息
  getUserInfo: "/permission/getPermission",
  // 获取系统用户信息
  getUserInfoId: "/tbuser/detailTbUser",
  // 获取系统用户列表
  userList: "/tbuser/getAllTbUser",
  // 修改密码
  editPassword: "/tbuser/updatePassword",
  // 修改系统用户状态
  setSystemUserStatus: "/tbuser/forbidden",
  // ============用户相关================
  // 获取用户列表
  getUserList: "/yfUser/getYfUserList",
  // 用户状态改变
  setUserStatus: "/yfUser/disableYfUser",
  // 获取用户信息
  getUserInfoW: "/yfUser/detailYfUser",
  // 修改用户信息
  upUserInfo: "/yfUser/updateYfUser",

  // =============论坛相关=============
  // 获取攻略列表
  getStrategyList: "/strategy/getStrategyList",
  // 攻略审核
  setStrategyStatus: "/strategy/approvalStrategy",
  // 攻略删除
  delStrategy: "/strategy/deleteStrategy",
  // 攻略发布
  addStrategy: "/strategy/publicStrategy",
  
  // 获取故事列表
  getStoryList: "/story/getStoryList",
  // 故事审核
  setStoryStatus: "/story/approvalStory",
  // 故事删除
  delStory: "/story/deleteStory",
  // 获取故事栏目列表
  getColumnList: "/column/getColumnList",

  // 获取动态列表
  getDynamicList: "/photo/list",
  // 动态审核
  setDynamicStatus: "/photo/approvalStory",
  // 动态删除
  delDynamic: "/photo/deleteStory",
  
  // 获取举报列表
  getReportList: "/report/list",
  // 获取举报类型
  getReportType: "/reportType/list",
  // 获取举报内容
  getReportText: "",
  // 举报审核
  setReportStatus: "/report/approval",
  // 举报删除
  delReport: "/report/delete",
  // 举报类型删除
  delReportType: "/reportType/delete",
  // 举报新增/更新
  addUpReportType: "/reportType/submit",
  
  // 获取攻略评论列表
  getStrategyCommentList: "/strategyComment/list",
  // 删除攻略评论
  delStrategyComment: "/strategyComment/delete",

   // 获取故事评论列表
   getStoryCommentList: "/storyComment/list",
   // 删除故事评论
   delStoryComment: "/storyComment/delete",

   // 获取动态评论列表
   getDynamicCommentList: "/photoComment/list",
   // 删除动态评论
   delDynamicComment: "/photoComment/delete",

   // 获取公告列表
   getNoticeList: "/notice/list",
   // 新增公告
   addNotice: "/notice/insert",
   // 编辑公告
   editNotice: "/notice/update",
   // 获取公告详情
   getNotice: "/notice/detail",
   // 公告状态修改
   setNoticeStatus: "/notice/forbidden",
   // 删除公告
   delNotice: "/notice/delete",

   // 获取新闻列表
   getNewsList: "/news/list",
   // 新增新闻
   addNews: "/news/insert",
   // 编辑新闻
   editNews: "/news/insert",
   // 获取新闻详情
   getNews: "/news/detail",
   // 新闻状态修改
   setNewsStatus: "",
   // 删除新闻
   delNews: "/news/delete",

   // 获取游戏列表
   getGameList: "/game/list",
   // 获取游戏详情
   getGame: "/game/detail",
   // 新增游戏
   addGame: "/game/insert",
   // 修改游戏状态
   setGameStatus: "/game/shelf",
   // 编辑游戏
   editGame: "/game/insert",
   // 删除游戏
   delGame: "/game/delete",

   // 获取游戏类型列表
   getGameTypeList: "/gameType/list",
   // 增加游戏类型
   addGameType: "/gameType/update",
   // 修改游戏类型
   setGameType: "/gameType/update",
   // 删除游戏类型
   delGameType: "/gameType/delete",
   
   // 获取版本信息
   getVersions: "/gameExtend/detail",
   // 增加版本信息
   addVersions: "/gameExtend/insert",
   // 修改版本信息
   editVersions: "/gameExtend/insert",
   // 删除版本信息
   delVersions: "/gameExtend/delete",

   // 获取礼包列表
   getGiftBagList: "/gift/list",
   // 获取礼包详情
   getGiftBag: "/gift/detail",
   // 新增礼包
   addGiftBag: "/gift/insert",
   // 修改礼包
   editGiftBag: "/gift/insert",
   // 修改礼包状态
   setGiftBagStatus: "/gift/shelf",
   // 删除礼包
   delGiftBag: "/gift/delete",

   // 获取物品列表
   getGoodsList: "/giftProp/listGiftProp",
   // 获取单个物品
   getGoods: "/giftProp/listByGiftId",
   // 新增物品
   addGoods: "/giftProp/insertProp",
   // 删除物品
   delGoods: "/giftProp/deleteProp",

   // 获取积分配置
   getIntegrayList: "/dailyTask/list",
   // 修改积分配置
   setIntegary: "/dailyTask/update",

   // 获取签到扩展配置列表
   getSignConfigList: "/signInExtend/list",
   // 获取单个配置
   getSignConfig: "/signInExtend/detail",
   // 新增
   addSignConfig: "/signInExtend/update",
   // 修改
   editSignConfig: "/signInExtend/update",
   // 删除
   delSignConfig: "/signInExtend/delete",

   // 获取头衔列表
   getGardTitleList: "/rank/getRankList",
   // 查看头衔
   getGardTitle: "/rank/detailRank",
   // 增加头衔
   addGardTitle: "/rank/updateRank",
   // 修改头衔
   setGardTitle: "/rank/updateRank",
   // 删除头衔
   delGardTitle: "/rank/delete",

   // 获取反馈列表
   getFeedBackList: "/feedback/list",
   // 查看反馈
   getFeedBack: "/feedback/detail",
   // 修改反馈状态
   setFeedBackStatus: "/feedback/approval",
   // 删除反馈
   delFeedBack: "/feedback/delete",

   // 获取活动公告列表
   getActiveList: "/activity/list",
   // 查看活动公告
   getActive: "/activity/detail",
   // 增加活动公告
   addActive: "/activity/insert",
   // 修改活动公告
   setActive: "/activity/insert",
   // 修改活动公告状态
   setActiveStatus: "/activity/operate",
   // 删除活动公告
   delActive: "/activity/delete",

   // 获取广告列表
   getAdList: "/advert/list",
   // 获取广告
   getAd: "/advert/detail",
   // 新增广告
   addAd: "/advert/insert",
   // 修改广告状态
   setAdStatus: "/advert/updateStatus",
   // 修改广告
   setAd: "/advert/insert",
   // 删除广告
   delAd: "/advert/delete",

   // 新增标签
   addTag: "/label/insert"
}
