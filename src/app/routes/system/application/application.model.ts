import { BaseTreeSortModel } from '../../../@core/model/base-tree-sort.model';
import { PermissionModel } from '../permission/permission.model';

/**
 * 应用model
 */
export class ApplicationModel extends BaseTreeSortModel {

  /**
   * 编号
   */
  code: string;

  /**
   * 图标
   */
  icon: string;

  /**
   * 路径
   */
  url: string;

  /**
   * 类型 0：接口模块；1：菜单模块；2：菜单标题
   */
  type: string;

  /**
   * 状态
   */
  isActive: string;

  /**
   * 应用下权限
   */
  permissions: PermissionModel[];

}
