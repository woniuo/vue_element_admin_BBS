/**
 * Created by WebStorm.
 * User: woniuo
 * Date: 2020/4/20
 * Description: 文件描述
 */
export default {
  // 获取角色列表
  getRoleList: "/tbrole/getRoleList",
  // 获取当前角色
  getRole: "/tbrole/detailTbRole",
  // 增加角色
  addRole: "/tbrole/insertTbRole",
  // 修改角色
  editRole: "/tbrole/updateTbRole",
  // 删除角色
  delRole: "/tbrole/deleteTbRole",
  // 分配角色权限
  rolePermissions: "/tbrole/updateRolePermission",
  // 查询角色的所有权限
  searchRolePermissions: "/tbrole/rolePermission",
  // 过滤用户角色查询所有权限
  searchRolePermissionsAll: "/tbrole/allPermission",
  // 根据当前子节点找父节点
  searchRoleParert: "/tbrole/getParentId",
  // 新增菜单按钮
  addMenuButton: "/permission/insertPermission"
}

