/**
 * 表配置信息model
 */
import {DmColumnModel} from "./dm-column.model";

export class DmTableModel {

  id: string;
  /** 编号 */
  code: string;
  /** 名称 */
  name: string;
  /** 状态 0：禁用；1启用 */
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
  /** 删除标志 0：正常；1：删除 */
  delFlag: string;
  /** 列信息 */
  columns: DmColumnModel[];
}
