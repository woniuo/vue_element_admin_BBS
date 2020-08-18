/**
 * Created by WebStorm.
 * User: woniuo
 * Date: 2020/4/20
 * Description: 文件描述
 */
import axios from "../axios"
import roleUrls from "../urls/role"

export default {
  // 获取角色列表
  fetchGetRoleList () {
    return axios.get(roleUrls.getRoleList)
  },
  // 获取角色信息
  fetchGetRole(data) {
    return axios.get(roleUrls.getRole, {params: data})
  },
  // 增加角色
  fetchAddRole (data) {
    return axios.post(roleUrls.addRole, data)
  },
  // 修改角色
  fetchEditRole (data) {
    return axios.post(roleUrls.editRole, data)
  },
  // 删除角色
  fetchDelRole (data) {
    return axios.post(roleUrls.delRole, data)
  },
  // 分配角色权限
  fetchRolePermissions (data) {
    return axios.post(roleUrls.rolePermissions, data)
  },
  // 查询角色的所有权限
  fetchSearchRolePermissions (data) {
    return axios.get(roleUrls.searchRolePermissions, {params: data})
  },
  
  // 过滤用户角色查询所有权限
  fetchSearchRolePermissionsAll (data) {
    return axios.get(roleUrls.searchRolePermissionsAll, data)
  },
  // 根据当前子节点找父节点
  fetchSearchRoleParent (data) {
    return axios.get(roleUrls.searchRoleParert, {params: data})
  },
  // 新增菜单按钮
  fetchAddMenuButton(data) {
    return axios.post(roleUrls.addMenuButton, data)
  }
}

