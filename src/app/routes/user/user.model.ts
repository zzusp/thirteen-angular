import { GroupModel } from '../group/group.model';
import { RoleModel } from '../role/role.model';
import { ApplicationModel } from '../application/application.model';
import { PermissionModel } from '../permission/permission.model';
import { DeptModel } from '../dept/dept.model';
import { BaseModel } from '../../@core/model/base.model';

/**
 * 用户model
 */
export class UserModel extends BaseModel {

  /** 部门编码 */
  deptCode: string;
  /** 组织编码 */
  groupCode: string;
  /** 名称 */
  name: string;
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
  /** 启用标记 0：禁用；1启用 */
  status: number;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 修改者 */
  updateBy: string;
  /** 修改时间 */
  updateTime: string;
  /** 备注 */
  remark: string;
  /** 版本号 */
  version: number;
  /** 用户所属部门信息 */
  dept: DeptModel;
  /** 用户所属组织信息 */
  group: GroupModel;
  /** 用户角色关联 */
  userRoles: any[];
  /** 用户拥有角色信息 */
  roles: RoleModel[];
  /** 用户拥有应用 */
  apps: ApplicationModel[];
  /** 用户拥有角色 */
  permissions: PermissionModel[];

}
