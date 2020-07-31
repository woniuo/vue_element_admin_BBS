/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2020/4/20
 * Description: 文件描述
 */
import axios from "../axios"
import userUrls from "../urls/user"

export default {
  // ================管理员相关================
  // 注册/添加账号
  fetchRegister (data) {
    return axios.post(userUrls.register, data)
  },
  // 删除用户
  fetchDelUser (data) {
    return axios.post(userUrls.delUser, data)
  },
  // 获取用户列表
  fetchUserList (data) {
    return axios.post(userUrls.userList, data)
  },
  // 修改用户信息
  fetchEditUser (data) {
    return axios.post(userUrls.editUser, data)
  },
  // 获取当前用户信息
  fetchGetUserInfo () {
    return axios.get(userUrls.getUserInfo)
  },
  // 获取用户信息
  fetchGetUserInfoId (data) {
    return axios.post(userUrls.getUserInfoId, data)
  },
  // 修改密码
  fetchEditPassword (data) {
    return axios.post(userUrls.editPassword, data)
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
  }
}

