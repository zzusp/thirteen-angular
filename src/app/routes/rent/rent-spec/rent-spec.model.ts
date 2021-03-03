import { BaseModel } from '../../../@core/model/base.model';
import { RentCategoryModel } from "../rent-category/rent-category.model";

/**
 * 物品规格model
 */
export class RentSpecModel extends BaseModel {

  /** 物品种类ID */
  itemId: string;
  /** 类别品名ID */
  categoryId: string;
  /** 物品名称 */
  name: string;
  /** 计量单位 0：元/根；1：元/米；2：元/个；3：元/条 */
  unit: number;
  /** 换算数量 */
  quantity: number;
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
  /** 类别品名 */
  category: RentCategoryModel;
  /** 出库数量 */
  outNum: number;
  /** 入库数量 */
  inNum: number;
  /** 租金 */
  rent: number;

}
