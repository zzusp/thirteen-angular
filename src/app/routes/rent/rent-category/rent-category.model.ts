import { BaseModel } from '../../../@core/model/base.model';

/**
 * 类别品名model
 */
export class RentCategoryModel extends BaseModel {

  /** 物品种类编码 */
  itemCode: string;
  /** 类别品名编码 */
  code: string;
  /** 物品名称 */
  name: string;
  /** 日租金 单位：元 */
  dailyRent: number;
  /** 计量单位 0：元/根；1：元/米；2：元/个；3：元/条 */
  unit: number;
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

}
