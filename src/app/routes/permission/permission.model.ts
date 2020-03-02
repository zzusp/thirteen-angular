import { BaseRecordModel } from '../../@core/model/base-record.model';
import { ApplicationModel } from '../application/application.model';

/**
 * 权限model
 */
export class PermissionModel extends BaseRecordModel {

  /** 路径 */
  url: string;
  /** 0：需登录；1：需认证；2：需授权（注：授权需登陆） */
  type: string;
  /** 所属应用 */
  application: ApplicationModel;

}
