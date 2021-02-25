import { BaseModel } from '../../../@core/model/base.model';

/**
 * 仓库或公司model
 */
export class RentRenterModel extends BaseModel {

  /** 仓库或公司名称 */
  name: string;
  /** 地址 */
  location: string;
  /** 联系人 */
  contacts: string;
  /** 联系电话 */
  mobile: string;
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
