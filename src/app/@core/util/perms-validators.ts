import { UserModel } from '../../routes/user/user.model';
import { getUserInfo } from './user-info';

/**
 * 按钮等页面元素的权限认证
 *
 * @param perms 权限code集合
 */
export function validatePerms(perms: string[]): boolean {
  let flag = false;
  const currentUser: UserModel = getUserInfo();
  if (currentUser !== null && currentUser.permissions != null) {
    let count = 0;
    for (const permission of perms) {
      if (currentUser.permissions.map((p) => {
        return p.code;
      }).includes(permission)) {
        count++;
      }
    }
    if (count === perms.length) {
      flag = true;
    }
  }
  return flag;
}