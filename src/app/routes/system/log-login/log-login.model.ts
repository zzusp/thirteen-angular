import { BaseModel } from '../../../@core/model/base.model';

/**
 * 登录日志model
 */
export class LogLoginModel extends BaseModel {

  /**
   * 账号
   */
  account: string;

  /**
   * 来源路径
   */
  requestPath: string;

  /**
   * 状态码
   */
  status: string;

  /**
   * 登录时间
   */
  loginTime: string;

  /**
   * 信息
   */
  message: string;

}
