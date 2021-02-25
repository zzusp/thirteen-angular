import { BaseModel } from '../../../@core/model/base.model';

/**
 * 系统初始化model
 */
export class RentBaseInfoModel extends BaseModel {

  /** 用户单位名称 */
  name: string;
  /** 单位所在地 */
  location: string;
  /** 表尾信息 */
  footerInfo: string;
  /** 每月结算日期 */
  settlementDay: number;
  /** 租赁期限 */
  leaseTerm: number;
  /** 计算方式 0：算头又算尾；1：算头不算尾 */
  computeMode: number;
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
