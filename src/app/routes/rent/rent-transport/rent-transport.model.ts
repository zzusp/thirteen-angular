import { BaseModel } from '../../../@core/model/base.model';

/**
 * 运输单model
 */
export class RentTransportModel extends BaseModel {

  /** 合同ID */
  contractId: string;
  /** 承租方施工地 */
  location: string;
  /** 承运人 */
  haulier: string;
  /** 运输日期 */
  deliveryDate: string;
  /** 运费 */
  carriage: number;
  /** 类型 0：出库；1：入库 */
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
  /** 运输单与规格关联 */
  rentTransportSpecs: any[];

}
