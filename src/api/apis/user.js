/**
 * Created by WebStorm.
 * User: woniuo
 * Date: 2020/4/20
 * Description: 文件描述
 */
import axios from "../axios"
import userUrls from "../urls/user"

export default {
  // 获取主页代办数据
  fetchGetMainToDo (data) {
    return axios.get(userUrls.getMainToDo, data)
  },
  // 获取主页图表数据
  fetchGetMainLineEcharts (data) {
    return axios.get(userUrls.getMainLineEcharts, data)
  },
  // 获取主页最新待审数据
  fetchGetMainPending (data) {
    return axios.get(userUrls.getMainPending, data)
  },
  // ================管理员相关================
  // 注册/添加账号
  fetchRegister (data) {
    return axios.post(userUrls.register, data)
  },
  // 删除系统用户
  fetchDelUser (data) {
    return axios.post(userUrls.delUser, data)
  },
  // 获取系统用户列表
  fetchUserList (data) {
    return axios.get(userUrls.userList, {params: data})
  },
  // 修改系统用户信息
  fetchEditUser (data) {
    return axios.post(userUrls.editUser, data)
  },
  // 获取当前系统用户信息
  fetchGetUserInfo () {
    return axios.get(userUrls.getUserInfo)
  },
  // 获取系统用户信息
  fetchGetUserInfoId (data) {
    return axios.get(userUrls.getUserInfoId, data)
  },
  // 修改密码
  fetchEditPassword (data) {
    return axios.post(userUrls.editPassword, data)
  },
  // 修改系统用户状态
  fetchSetSystemUserStatus(data) {
    return axios.post(userUrls.setSystemUserStatus, data)
  },
  // =====================用户相关==============
  // 获取用户列表
  fetchGetUserList (data) {
    return axios.get(userUrls.getUserList,{params: data})
  },
  // 用户状态改变
  fetchSetUserStatus (data) {
    return axios.post(userUrls.setUserStatus, data)
  },
  // 获取用户信息W
  fetchGetUserInfoW (data) {
    return axios.get(userUrls.getUserInfoW, {params: data})
  },
  // 更改用户信息
  fetchUpUserInfo (data) {
    return axios.post(userUrls.upUserInfo, data)
  },
  // ================论坛相关==================
  // 获取攻略列表
  fetchGetStrategyList (data) {
    return axios.get(userUrls.getStrategyList, {params: data})
  },
  // 攻略审批
  fetchSetStrategyStatus (data) {
    return axios.post(userUrls.setStrategyStatus, data)
  },
  // 攻略删除
  fetchDelStrategy (data) {
    return axios.post(userUrls.delStrategy, data)
  },
  // 攻略发布
  fetchAddStrategy (data) {
    return axios.post(userUrls.addStrategy, data)
  },
  // 获取故事列表
  fetchGetStoryList (data) {
    return axios.get(userUrls.getStoryList, {params: data})
  },
  // 故事审批
  fetchSetStoryStatus (data) {
    return axios.post(userUrls.setStoryStatus, data)
  },
  // 故事删除
  fetchDelStory (data) {
    return axios.post(userUrls.delStory, data)
  },
  // 获取故事栏目列表
  fetchColumnList (data) {
    return axios.get(userUrls.getColumnList, {params: data})
  },
  // 获取动态列表
  fetchGetDynamicList (data) {
    return axios.get(userUrls.getDynamicList, {params: data})
  },
  // 动态审批
  fetchSetDynamicStatus (data) {
    return axios.post(userUrls.setDynamicStatus, data)
  },
  // 动态删除
  fetchDelDynamic (data) {
    return axios.post(userUrls.delDynamic, data)
  },
  // 获取举报列表
  fetchGetReportList (data) {
    return axios.get(userUrls.getReportList, {params: data})
  },
  // 获取举报类型
  fetchGetReportType (data) {
    return axios.get(userUrls.getReportType, {params: data})
  },
  // 获取举报内容
  fetchGetReportText () {
    return axios.get(userUrls.getReportText)
  },
  // 举报审核
  fetchSetReportStatus (data) {
    return axios.post(userUrls.setReportStatus, data)
  },
  // 举报删除
  fetchDelReport (data) {
    return axios.post(userUrls.delReport, data)
  },
  // 举报类型删除
  fetchDelReportType(data) {
    return axios.post(userUrls.delReportType, data)
  },
  // 举报新增/更新
  fetchAddUpReportType(data) {
    return axios.post(userUrls.addUpReportType, data)
  },
  // 获取攻略评论列表
  fetchGetStrategyCommentList (data) {
    return axios.get(userUrls.getStrategyCommentList, {params: data})
  },
  // 删除攻略评论
  fetchDelStrategyComment (data) {
    return axios.post(userUrls.delStrategyComment, data)
  },
   // 获取故事评论列表
   fetchGetStoryCommentList (data) {
    return axios.get(userUrls.getStoryCommentList, {params: data})
  },
  // 删除故事评论
  fetchDelStoryComment (data) {
    return axios.post(userUrls.delStoryComment, data)
  },
   // 获取动态评论列表
   fetchGetDynamicCommentList (data) {
    return axios.get(userUrls.getDynamicCommentList, {params: data})
  },
  // 删除动态评论
  fetchDelDynamicComment (data) {
    return axios.post(userUrls.delDynamicComment, data)
  },
  // 获取公告列表
  fetchGetNoticeList(data) {
    return axios.get(userUrls.getNoticeList, {params: data})
  },
  // 新增公告
  fetchAddNotice(data) {
    return axios.post(userUrls.addNotice, data)
  },
  // 编辑公告
  fetchEditNotice(data) {
    return axios.post(userUrls.editNotice, data)
  },
  // 获取公告详情
  fetchGetNoticeData(data) {
    return axios.get(userUrls.getNotice, {params: data})
  },
  // 公告状态修改
  fetchSetNoticeStatus(data) {
    return axios.post(userUrls.setNoticeStatus, data)
  },
  // 删除公告
  fetchDelNotice(data) {
    return axios.post(userUrls.delNotice, data)
  },
  // 获取新闻列表
  fetchGetNewsList(data) {
    return axios.get(userUrls.getNewsList, {params: data})
  },
  // 新增新闻
  fetchAddNews(data) {
    return axios.post(userUrls.addNews, data)
  },
  // 编辑新闻
  fetchEditNews(data) {
    return axios.post(userUrls.editNews, data)
  },
  // 获取新闻详情
  fetchGetNewsData(data) {
    return axios.get(userUrls.getNews, {params: data})
  },
  // 新闻状态修改
  fetchSetNewsStatus(data) {
    return axios.post(userUrls.setNewsStatus, data)
  },
  // 删除新闻
  fetchDelNews(data) {
    return axios.post(userUrls.delNews, data)
  },
  // 获取游戏列表
  fetchGetGameList(data) {
    return axios.get(userUrls.getGameList, {params: data})
  },
  // 获取游戏详情
  fetchGetGame(data) {
    return axios.get(userUrls.getGame, {params: data})
  },
  // 增加游戏
  fetchAddGame(data) {
    return axios.post(userUrls.addGame, data)
  },
  // 修改游戏状态
  fetchSetGameStatus(data) {
    return axios.post(userUrls.setGameStatus, data)
  },
  // 编辑游戏
  fetchEditGame(data) {
    return axios.post(userUrls.editGame, data)
  },
  // 删除游戏
  fetchDelGame(data) {
    return axios.post(userUrls.delGame, data)
  },

  // 获取版本信息
  fetchGetVersions(data) {
    return axios.get(userUrls.getVersions, {params: data})
  },
  // 增加版本信息
  fetchAddVersions(data) {
    return axios.post(userUrls.addVersions, data)
  },
  // 修改版本信息
  fetchEditVersions(data) {
    return axios.post(userUrls.editVersions, data)
  },
  // 删除版本信息
  fetchDelVersions(data) {
    return axios.post(userUrls.delVersions, data)
  },
  
  // 获取游戏类型列表
  fetchGetGameTypeList(data) {
    return axios.get(userUrls.getGameTypeList, {params: data})
  },
  // 增加游戏类型
  fetchAddGameType(data) {
    return axios.post(userUrls.addGameType, data)
  },
  // 修改游戏类型
  fetchSetGameType(data) {
    return axios.post(userUrls.setGameType, data)
  },
  // 删除游戏类型
  fetchDelGameType(data) {
    return axios.post(userUrls.delGameType, data)
  },

  // 获取礼包列表
  fetchGetGiftBagList(data) {
    return axios.get(userUrls.getGiftBagList, {params: data})
  },
  // 获取礼包详情
  fetchGetGiftBag(data) {
    return axios.get(userUrls.getGiftBag, {params: data})
  },
  // 新增礼包
  fetchAddGiftBag(data) {
    return axios.post(userUrls.addGiftBag, data)
  },
  // 修改礼包
  fetchEditGiftBag(data) {
    return axios.post(userUrls.editGiftBag, data)
  },
  // 修改礼包状态
  fetchSetGiftBagStatus(data) {
    return axios.post(userUrls.setGiftBagStatus, data)
  },
  // 删除礼包
  fetchDelGiftBag(data) {
    return axios.post(userUrls.delGiftBag, data)
  },

  // 获取物品列表
  fetchGetGoodsList(data) {
    return axios.get(userUrls.getGoodsList, {params: data})
  },
  // 获取单个物品
  fetchGetGoods(data) {
    return axios.get(userUrls.getGoods, {params: data})
  },
  // 新增物品
  fetchAddGoods(data) {
    return axios.post(userUrls.addGoods, data)
  },
  // 删除物品
  fetchDelGoods(data) {
    return axios.post(userUrls.delGoods, data)
  },

  // 获取积分配置
  fetchGetIntegrayList(data) {
    return axios.get(userUrls.getIntegrayList, data)
  },
  // 修改积分配置
  fetchSetIntegray(data) {
    return axios.post(userUrls.setIntegary, data)
  },

  // 获取签到扩展配置列表
  fetchGetSignConfigList(data) {
    return axios.get(userUrls.getSignConfigList, {params: data})
  },
  // 获取单个配置
  fetchGetSignConfig(data) {
    return axios.get(userUrls.getSignConfig, {params: data})
  },
  // 新增
  fetchAddSignConfig(data) {
    return axios.post(userUrls.addSignConfig, data)
  },
  // 修改
  fetchEditSignConfig(data) {
    return axios.post(userUrls.editSignConfig, data)
  },
  // 删除
  fetchDelSignConfig(data) {
    return axios.post(userUrls.delSignConfig, data)
  },
  
  // 获取头衔列表
  fetchGetGardTitleList(data) {
    return axios.get(userUrls.getGardTitleList, {params: data})
  },
  // 查看头衔
  fetchGetGardTitle(data) {
    return axios.get(userUrls.getGardTitle, {params: data})
  },
  // 增加头衔
  fetchAddGardTitle(data) {
    return axios.post(userUrls.addGardTitle, data)
  },
  // 修改头衔
  fetchSetGardTitle(data) {
    return axios.post(userUrls.setGardTitle, data)
  },
  // 删除头衔
  fetchDelGardTitle(data) {
    return axios.post(userUrls.delGardTitle, data)
  },

  // 获取反馈列表
  fetchGetFeedBackList(data) {
    return axios.get(userUrls.getFeedBackList, {params: data})
  },
  // 查看反馈
  fetchGetFeedBack(data) {
    return axios.get(userUrls.getFeedBack, {params: data})
  },
  // 修改反馈状态
  fetchSetFeedBack(data) {
    return axios.post(userUrls.setFeedBackStatus, data)
  },
  // 删除反馈
  fetchDelFeedBack(data) {
    return axios.post(userUrls.delFeedBack, data)
  },

  // 获取活动公告列表
  fetchGetActiveList(data) {
    return axios.get(userUrls.getActiveList, {params: data})
  },
  // 查看活动公告
  fetchGetActive(data) {
    return axios.get(userUrls.getActive, {params: data})
  },
  // 增加活动公告
  fetchAddActive(data) {
    return axios.post(userUrls.addActive, data)
  },
  // 修改活动公告
  fetchSetActive(data) {
    return axios.post(userUrls.setActive, data)
  },
  // 修改活动公告状态
  fetchSetActiveStatus(data) {
    return axios.post(userUrls.setActiveStatus, data)
  },
  // 删除活动公告
  fetchDelActive(data) {
    return axios.post(userUrls.delActive, data)
  },

  // 获取广告列表
  fetchGetAdList(data) {
    return axios.get(userUrls.getAdList, {params: data})
  },
  // 获取广告
  fetchGetAd(data) {
    return axios.get(userUrls.getAd, {params: data})
  },
  // 新增广告
  fetchAddAd(data) {
    return axios.post(userUrls.addAd, data)
  },
  // 修改广告状态
  fetchSetAdStatus(data) {
    return axios.post(userUrls.setAdStatus, data)
  },
  // 修改广告
  fetchSetAd(data) {
    return axios.post(userUrls.setAd, data)
  }, 
  // 删除广告
  fetchDelAd(data) {
    return axios.post(userUrls.delAd, data)
  }, 

  // 新增标签
  fetchAddTag(data) {
    return axios.post(userUrls.addTag, data)
  }
}

