import { BaseTreeSortModel } from '../../@core/model/base-tree-sort.model';

/**
 * 部门model
 */
export class DeptModel extends BaseTreeSortModel {

  /** 简称 */
  shortName: string;
  /** 排序 */
  orderNum: number;
  /** 部门拥有角色信息 */
  deptRoles: any[];

}
