import { BizTypeModel } from '../biz-type/biz-type.model';
import { BaseModel } from '../../@core/model/base.model';

/**
 * 数据字典model
 */
export class DictModel extends BaseModel {

  /** 业务类型编码 */
  bizTypeCode: string;
  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
  /** 启用标记 0：禁用；1启用 */
  status: number;
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
  /** 业务类型 */
  bizType: BizTypeModel;

}
