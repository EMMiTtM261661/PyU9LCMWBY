// 代码生成时间: 2025-09-22 04:58:34
// 引入THREEJS库
const THREE = require('three');

class UserPermissionSystem {
  
  /**
   * @param {Object} options - 初始化参数
   * @param {string[]} options.permissions - 用户权限列表
   */
  constructor(options) {
    if (!options || !options.permissions) {
      throw new Error('初始化参数中必须包含权限列表');
    }
    this.permissions = options.permissions;
  }

  /**
   * 检查用户是否具有特定权限
   * @param {string} permission - 需要检查的权限
   * @returns {boolean} - 用户是否具有权限
   */
  hasPermission(permission) {
    if (!permission) {
      throw new Error('必须提供要检查的权限');
    }
    return this.permissions.includes(permission);
  }

  /**
   * 添加新权限
   * @param {string} permission - 要添加的新权限
   */
  addPermission(permission) {
    if (!permission) {
      throw new Error('必须提供要添加的权限');
    }
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    } else {
      console.warn(`权限 '${permission}' 已经存在。`);
    }
  }

  /**
   * 删除权限
   * @param {string} permission - 要删除的权限
   */
  removePermission(permission) {
    if (!permission) {
      throw new Error('必须提供要删除的权限');
    }
    const index = this.permissions.indexOf(permission);
    if (index > -1) {
      this.permissions.splice(index, 1);
    } else {
      console.warn(`权限 '${permission}' 不存在，无法删除。`);
    }
  }
}

// 示例用法
try {
  const permissionSystem = new UserPermissionSystem({
    permissions: ['view', 'edit', 'delete']
  });

  console.log(permissionSystem.hasPermission('edit')); // 输出: true
  console.log(permissionSystem.hasPermission('admin')); // 输出: false

  permissionSystem.addPermission('admin');
  console.log(permissionSystem.hasPermission('admin')); // 输出: true

  permissionSystem.removePermission('delete');
  console.log(permissionSystem.hasPermission('delete')); // 输出: false
} catch (error) {
  console.error(error.message);
}
