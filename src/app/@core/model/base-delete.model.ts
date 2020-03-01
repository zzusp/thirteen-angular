/**
 * 通用model（包含删除标记信息的model的基类）
 */
import { BaseModel } from './base.model';

export class BaseDeleteModel extends BaseModel {

  /** 主键ID */
  delFlag: string;

}
