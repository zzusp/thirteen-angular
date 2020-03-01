import { Component, Input, OnInit } from '@angular/core';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { Observable } from 'rxjs';
import { BizTypeModel } from '../biz-type.model';
import { abstractValidate } from '../../../../@core/util/custom-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { NzModalRef } from 'ng-zorro-antd';
import { BizTypeService } from '../biz-type.service';

@Component({
  selector: 'app-biz-type-edit',
  templateUrl: './biz-type-edit.component.html',
  styleUrls: ['./biz-type-edit.component.scss']
})
export class BizTypeEditComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 业务类型ID */
  @Input() id: string;
  /** 编辑表单 */
  editForm: FormGroup;

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private bizTypeService: BizTypeService) {
  }

  ngOnInit() {
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      code: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      name: [null, Validators.required],
      active: [null, Validators.required],
      remark: [null, Validators.maxLength(250)],
      version: [null]
    });
    // 所有需加载的资源都已加载完成，初始化表单
    if (this.id !== this.global.INSERT_FLAG) {
      this.initUpdate();
    } else {
      this.initSave();
    }
  }

  /**
   * 新增表单初始化
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.bizTypeService.insert(params);
    };
    // 添加异步验证，验证code是否存在，错误标识 existing
    this.editForm.get('code').setAsyncValidators(abstractValidate((code: string) => {
      return this.bizTypeService.checkCode(code);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      code: null,
      name: null,
      active: this.global.ACTIVE_ON,
      remark: null,
      version: null
    });
    this.editForm.get('code').enable();
  }

  /**
   * 初始化更新
   */
  initUpdate() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.bizTypeService.update(params);
    };
    // 获取业务类型信息初始化表单
    this.bizTypeService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: BizTypeModel = res.result;
        this.editForm.get('code').clearAsyncValidators();
        // 表单重置
        this.editForm.reset({
          id: model.id,
          code: model.code,
          name: model.name,
          active: model.active,
          remark: model.remark,
          version: model.version
        });
        this.editForm.get('code').disable();
      });
  }

  /**
   * 表单提交
   */
  submitForm() {
    for (const key of Object.keys(this.editForm.controls)) {
      this.editForm.controls[key].markAsDirty();
      this.editForm.controls[key].updateValueAndValidity({onlySelf: true});
    }
    if (this.editForm.valid) {
      this.request(this.editForm.getRawValue()).subscribe((res: ResponseResultModel) => {
        // 清空表单
        this.editForm.reset();
        // 关闭模态框
        this.destroyModal(true);
      });
    }
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
