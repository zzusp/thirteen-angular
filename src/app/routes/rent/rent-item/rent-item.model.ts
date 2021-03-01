import { BaseModel } from '../../../@core/model/base.model';
import { RentCategoryModel } from '../rent-category/rent-category.model';

/**
 * 物品种类model
 */
export class RentItemModel extends BaseModel {

  /** 物品名称 */
  name: string;
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
  categorys: RentCategoryModel[];

}
