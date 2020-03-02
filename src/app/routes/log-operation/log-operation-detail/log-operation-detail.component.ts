import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { LogOperationService } from '../log-operation.service';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { LogOperationModel } from '../log-operation.model';

@Component({
  selector: 'app-log-operation-detail',
  templateUrl: './log-operation-detail.component.html',
  styleUrls: ['./log-operation-detail.component.scss']
})
export class LogOperationDetailComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 登录日志ID */
  @Input() id: string;
  /** 编辑表单 */
  editForm: FormGroup;

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private logOperationService: LogOperationService) {
  }

  ngOnInit() {
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      account: [null],
      applicationCode: [null],
      requestPath: [null],
      operationValue: [null],
      operationNotes: [null],
      method: [null],
      arguments: [null],
      result: [null],
      status: [null],
      startTime: [null],
      endTime: [null],
      message: [null]
    });
    this.editForm.disable();
    this.editForm.get('arguments').enable();
    this.editForm.get('result').enable();
    this.editForm.get('message').enable();
    // 初始化
    this.init();
  }

  /**
   * 初始化更新
   */
  init() {
    // 获取登录日志信息初始化表单
    this.logOperationService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: LogOperationModel = res.result;
        // 表单重置
        this.editForm.reset({
          id: model.id,
          account: model.account,
          applicationCode: model.applicationCode,
          requestPath: model.requestPath,
          operationValue: model.operationValue,
          operationNotes: model.operationNotes,
          method: model.method,
          arguments: model.arguments,
          result: model.result,
          status: model.status,
          startTime: model.startTime,
          endTime: model.endTime,
          message: model.message
        });
      });
  }

  /**
   * 销毁（关闭）模态框，并返回结果
   *
   * @param refresh 是否刷新，默认为不刷新
   */
  destroyModal(refresh: boolean = false) {
    this.modal.destroy({refresh: refresh});
  }

}
