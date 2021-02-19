import { BaseDeleteModel } from './base-delete.model';

/**
 * 所有包含创建，更新，备注，删除标记信息的model的基类
 */
export class BaseRecordModel extends BaseDeleteModel {

  /** 应用编码 */
  appCode: string;
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
}
