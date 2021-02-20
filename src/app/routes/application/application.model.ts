import { PermissionModel } from '../permission/permission.model';
import { BaseTreeSortModel } from "../../@core/model/base-tree-sort.model";

/**
 * 应用model
 */
export class ApplicationModel extends BaseTreeSortModel {

  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
  /** 启用标记 0：禁用；1启用 */
  status: number;
  /** 图标 */
  icon: string;
  /** 路径 */
  url: string;
  /** 类型 0：接口模块；1：菜单模块；2：菜单标题 */
  type: number;
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
  /** 应用下权限 */
  permissions: PermissionModel[];

}
