import { BaseModel } from '../../../@core/model/base.model';
import { RentItemModel } from "../rent-item/rent-item.model";
import { RentTransportModel } from "./rent-transport.model";

/**
 * 合同model
 */
export class RentContractModel extends BaseModel {

  /** 承租方ID */
  renterId: string;
  /** 承租方施工地 */
  location: string;
  /** 业务员 */
  contacts: string;
  /** 签订日期 */
  signDate: string;
  /** 终止日期，预留字段 */
  closeDate: string;
  /** 计算方式 0：算头又算尾；1：算头不算尾 */
  computeMode: number;
  /** 合同状态 0：租赁中；1：已结算； */
  contractStatus: string;
  /** 应付金额 */
  amountPayable: number;
  /** 实付金额 */
  amountPaid: number;
  /** 结算日期 */
  balanceDate: number;
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
  /** 合同中的物品种类集合 */
  rentItems: RentItemModel[];
  /** 合同中的运输单集合 */
  rentTransports: RentTransportModel[];

}
