import { BaseRecordModel } from '../../../@core/model/base-record.model';
import {BizTypeModel} from '../biz-type/biz-type.model';

/**
 * 数据字典model
 */
export class DictModel extends BaseRecordModel {

  /**
   * 编号
   */
  code: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 状态
   */
  isActive: string;

  /**
   * 业务类型
   */
  bizType: BizTypeModel;

}
