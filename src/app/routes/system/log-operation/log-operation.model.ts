import { BaseModel } from '../../../@core/model/base.model';

/**
 * 操作日志model
 */
export class LogOperationModel extends BaseModel {

  /**
   * 用户ID
   */
  userId: string;

  /**
   * 应用ID
   */
  applicationId: string;

  /**
   * 来源路径
   */
  requestPath: string;

  /**
   * 操作开始时间
   */
  startTime: string;

  /**
   * 操作结束时间
   */
  endTime: string;

  /**
   * 操作名称
   */
  operationValue: string;

  /**
   * 操作描述
   */
  operationNotes: string;

  /**
   * 方法
   */
  method: string;

  /**
   * 参数
   */
  arguments: string;

  /**
   * 结果
   */
  result: string;

  /**
   * 状态码
   */
  status: string;

  /**
   * 信息
   */
  message: string;

}
