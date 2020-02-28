import { BaseRecordModel } from '../../../@core/model/base-record.model';
import { ApplicationModel } from '../application/application.model';
import { PermissionModel } from '../permission/permission.model';
import { GroupModel } from '../group/group.model';

/**
 * 角色model
 */
export class RoleModel extends BaseRecordModel {

  /**
   * 编号
   */
  code: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 状态
   */
  isActive: string;

  /**
   * 用户所属组织信息
   */
  group: GroupModel;

  /**
   * 角色下应用
   */
  applications: ApplicationModel[];

  /**
   * 角色下权限
   */
  permissions: PermissionModel[];
}
