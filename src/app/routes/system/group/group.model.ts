import { BaseTreeSortModel } from '../../../@core/model/base-tree-sort.model';
import { RoleModel } from '../role/role.model';

/**
 * 组织model
 */
export class GroupModel extends BaseTreeSortModel {

  /**
   * 编号
   */
  code: string;

  /**
   * 简称
   */
  shortName: string;

  /**
   * 状态
   */
  isActive: string;

  /**
   * 组织拥有角色信息
   */
  roles: RoleModel[];

}
