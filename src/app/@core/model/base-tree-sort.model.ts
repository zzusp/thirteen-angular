import { BaseRecordModel } from './base-record.model';

/**
 * 上下级结构的model的基类
 */
export class BaseTreeSortModel extends BaseRecordModel {

  /** 排序 */
  sort: number;
  /** 父节点编码 */
  parentCode: string;
  /** 节点 */
  children: BaseTreeSortModel[];

}
