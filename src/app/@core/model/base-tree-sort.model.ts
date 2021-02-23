import { BaseModel } from "./base.model";

/**
 * 上下级结构的model的基类
 */
export class BaseTreeSortModel extends BaseModel {

  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
  /** 排序 */
  orderNum: number;
  /** 父节点编码 */
  pCode: string;
  /** 节点 */
  children: BaseTreeSortModel[];

}
