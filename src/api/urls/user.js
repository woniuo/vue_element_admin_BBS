/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2020/4/20
 * Description: 文件描述
 */
export default {
  // ==============后台相关================
  // 注册/添加账号
  register: "/admin/user/register",
  // 删除用户
  delUser: "/user/delUser",
  // 修改用户信息
  editUser: "/user/editUserInfo",
  // 获取当前用户信息
  getUserInfo: "/permission/getPermission",
  // 获取用户信息
  getUserInfoId: "/user/getUserInfoId",
  // 获取用户列表
  userList: "/user/userList",
  // 修改密码
  editPassword: "/user/editPassword",
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
  
  // 获取故事列表
  getStoryList: "/story/getStoryList",
  // 故事审核
  setStoryStatus: "/story/approvalStory",
  // 故事删除
  delStory: "/story/deleteStory",
  // 获取故事栏目列表
  getColumnList: "/column/getColumnList",

  // 获取动态列表
  getDynamicList: "/photo/getPhotoList",
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
   setNoticeStatus: "",
   // 删除公告
   delNotice: "/notice/delete",
}
