import { BaseModel } from "./base.model";

/**
 * 上下级结构的model的基类
 */
export class BaseTreeSortModel extends BaseModel {

  /** 排序 */
  orderNum: number;
  /** 父节点编码 */
  pCode: string;
  /** 节点 */
  children: BaseTreeSortModel[];

}
