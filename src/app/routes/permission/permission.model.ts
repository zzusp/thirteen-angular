import { ApplicationModel } from '../application/application.model';
import { BaseModel } from "../../@core/model/base.model";

/**
 * 权限model
 */
export class PermissionModel extends BaseModel {

  /** 应用编码 */
  appCode: string;
  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
  /** 启用标记 0：禁用；1启用 */
  status: number;
  /** 路径 */
  url: string;
  /** 0：需登录；1：需认证；2：需授权（注：授权需登陆） */
  type: string;
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
  /** 所属应用 */
  application: ApplicationModel;

}
