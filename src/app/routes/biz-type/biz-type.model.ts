import { BaseRecordModel } from '../../@core/model/base-record.model';
import { DictModel } from '../dict/dict.model';

/**
 * 业务类型model
 */
export class BizTypeModel extends BaseRecordModel {

  /** 业务类型下的数据字典信息 */
  dicts: DictModel[];

}
