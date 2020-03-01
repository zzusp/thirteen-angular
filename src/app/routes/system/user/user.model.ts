import { BaseRecordModel } from '../../../@core/model/base-record.model';
import { GroupModel } from '../group/group.model';
import { RoleModel } from '../role/role.model';
import { ApplicationModel } from '../application/application.model';
import { PermissionModel } from '../permission/permission.model';
import { DeptModel } from '../dept/dept.model';

/**
 * 用户model
 */
export class UserModel extends BaseRecordModel {

  /** 账号 */
  account: string;
  /** 密码 */
  password: string;
  /** 性别 */
  gender: string;
  /** 手机 */
  mobile: string;
  /** 邮箱 */
  email: string;
  /** 头像 */
  photo: string;
  /** 用户所属部门信息 */
  dept: DeptModel;
  /** 用户所属组织信息 */
  group: GroupModel;
  /** 用户拥有角色信息 */
  roles: RoleModel[];
  /** 用户拥有应用 */
  applications: ApplicationModel[];
  /** 用户拥有角色 */
  permissions: PermissionModel[];

}
