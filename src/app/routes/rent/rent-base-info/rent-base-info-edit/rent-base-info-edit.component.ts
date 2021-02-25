import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { RentBaseInfoService } from '../rent-base-info.service';
import { abstractValidate } from '../../../../@core/util/custom-validators';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { RentBaseInfoModel } from '../rent-base-info.model';

@Component({
  selector: 'app-rent-base-info-edit',
  templateUrl: './rent-base-info-edit.component.html',
  styleUrls: ['./rent-base-info-edit.component.scss']
})
export class RentBaseInfoEditComponent implements OnInit {

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
              private rentBaseInfoService: RentBaseInfoService) {
  }

  ngOnInit(): void {
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      location: [null, Validators.required],
      footerInfo: [null, Validators.required],
      settlementDay: [null, Validators.required],
      leaseTerm: [null, Validators.required],
      computeMode: [null, Validators.required],
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
      return this.rentBaseInfoService.insert(params);
    };
    // 添加异步验证，验证name是否存在，错误标识 existing
    this.editForm.get('name').setAsyncValidators(abstractValidate((name: string) => {
      return this.rentBaseInfoService.checkName(name);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      name: null,
      location: null,
      footerInfo: null,
      settlementDay: null,
      leaseTerm: null,
      computeMode: this.global.COMPUTE_MODE_ALL,
      remark: null,
      version: null
    });
    this.editForm.get('name').enable();
  }

  /**
   * 初始化更新
   */
  initUpdate() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentBaseInfoService.update(params);
    };
    // 获取业务类型信息初始化表单
    this.rentBaseInfoService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: RentBaseInfoModel = res.result;
        // 表单重置
        this.editForm.reset({
          id: model.id,
          name: model.name,
          location: model.location,
          footerInfo: model.footerInfo,
          settlementDay: model.settlementDay,
          leaseTerm: model.leaseTerm,
          computeMode: model.computeMode,
          remark: model.remark,
          version: model.version
        });
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
