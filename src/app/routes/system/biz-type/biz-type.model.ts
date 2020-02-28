import { BaseRecordModel } from '../../../@core/model/base-record.model';
import {DictModel} from '../dict/dict.model';

/**
 * 业务类型model
 */
export class BizTypeModel extends BaseRecordModel {

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
   * 业务类型下的数据字典信息
   */
  dicts: DictModel[];

}
