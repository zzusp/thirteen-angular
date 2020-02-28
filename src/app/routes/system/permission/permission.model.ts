import { BaseRecordModel } from '../../../@core/model/base-record.model';
import {ApplicationModel} from '../application/application.model';

/**
 * 权限model
 */
export class PermissionModel extends BaseRecordModel {

  /**
   * 编号
   */
  code: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 路径
   */
  url: string;

  /**
   * 排序
   */
  sort: number;

  /**
   * 0：需登录；1：需认证；2：需授权（注：授权需登陆）
   */
  type: string;

  /**
   * 状态
   */
  isActive: string;

  /**
   * 所属应用
   */
  application: ApplicationModel;

}
