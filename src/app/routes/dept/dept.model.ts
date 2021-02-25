import { BaseTreeSortModel } from '../../@core/model/base-tree-sort.model';

/**
 * 部门model
 */
export class DeptModel extends BaseTreeSortModel {

  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
  /** 启用标记 0：禁用；1启用 */
  status: number;
  /** 简称 */
  shortName: string;
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
  /** 部门拥有角色信息 */
  deptRoles: any[];

}
