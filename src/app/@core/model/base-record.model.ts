import { BaseModel } from './base.model';

/**
 * 所有包含创建，更新，备注，删除标记信息的model的基类
 */
export class BaseRecordModel extends BaseModel {

  /**
   * 创建者
   */
  createBy: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 修改者
   */
  updateBy: string;

  /**
   * 修改时间
   */
  updateTime: string;

  /**
   * 备注
   */
  remark: string;
}
