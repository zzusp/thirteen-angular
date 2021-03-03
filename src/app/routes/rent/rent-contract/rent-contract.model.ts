import { BaseModel } from '../../../@core/model/base.model';
import { RentTransportModel } from '../rent-transport/rent-transport.model';
import { RentCategoryModel } from '../rent-category/rent-category.model';
import { RentRenterModel } from '../rent-renter/rent-renter.model';

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
  /** 承租方信息 */
  rentRenter: RentRenterModel;
  /** 合同与类别品名关联 */
  rentContractCategories: any[];
  /** 合同中的类别品名集合 */
  rentCategories: RentCategoryModel[];
  /** 合同中的运输单集合 */
  rentTransports: RentTransportModel[];
  /** 合同中的运输单与物品规格关联 */
  rentTransportSpecs: any[];

}
