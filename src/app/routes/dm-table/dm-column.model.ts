/**
 * 表中列的配置信息model
 */
export class DmColumnModel {

  id: string;
  /** 编号 */
  code: string;
  /** 名称 */
  name: string;
  /** 数据库类型 */
  dbType: string;
  /** java类型 */
  javaType: string;
  /** 字段长度 */
  length: string;
  /** 是否不可为NULL 0：可为NULL；1：不可为NULL */
  notNull: number;
  /** 字段类型 0：主键字段；1：逻辑删除字段；2：版本号字段 */
  columnType: number;
  /** 显示顺序 */
  orderNumber: number;
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

}
