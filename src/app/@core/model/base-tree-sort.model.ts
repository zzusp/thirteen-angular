import { BaseRecordModel } from './base-record.model';

/**
 * 上下级结构的model的基类
 */
export class BaseTreeSortModel extends BaseRecordModel {

  /**
   * 名称
   */
  name: string;

  /**
   * 排序
   */
  sort: number;

  /**
   * 父节点ID
   */
  parentId: string;

  /**
   * 子节点
   */
  children: BaseTreeSortModel[];

}
