import { BaseModel } from "../../@core/model/base.model";

/**
 * 角色model
 */
export class RoleModel extends BaseModel {

  /** 组织编码 */
  groupCode: string;
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
  /** 角色下应用 */
  apps: any[];
  /** 角色下权限 */
  permissions: any[];
}
