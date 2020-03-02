import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { LogLoginService } from '../log-login.service';
import { LogLoginModel } from '../log-login.model';

@Component({
  selector: 'app-log-login-detail',
  templateUrl: './log-login-detail.component.html',
  styleUrls: ['./log-login-detail.component.scss']
})
export class LogLoginDetailComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /**
   * 登录日志ID
   */
  @Input() id: string;
  /** 编辑表单 */
  editForm: FormGroup;

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private logLoginService: LogLoginService) {
  }

  ngOnInit() {
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      account: [null],
      requestPath: [null],
      status: [null],
      loginTime: [null],
      message: [null]
    });
    this.editForm.disable();
    this.editForm.get('message').enable();
    // 初始化
    this.init();
  }

  /**
   * 初始化更新
   */
  init() {
    // 获取登录日志信息初始化表单
    this.logLoginService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: LogLoginModel = res.result;
        // 表单重置
        this.editForm.reset({
          id: model.id,
          account: model.account,
          requestPath: model.requestPath,
          status: model.status,
          loginTime: model.loginTime,
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
