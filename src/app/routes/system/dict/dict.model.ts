import { BaseRecordModel } from '../../../@core/model/base-record.model';
import { BizTypeModel } from '../biz-type/biz-type.model';

/**
 * 数据字典model
 */
export class DictModel extends BaseRecordModel {

  /** 业务类型 */
  bizType: BizTypeModel;

}
