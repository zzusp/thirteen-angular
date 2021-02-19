import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { PermissionService } from '../permission.service';
import { ApplicationService } from '../../application/application.service';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { abstractValidate } from '../../../@core/util/custom-validators';
import { PermissionModel } from '../permission.model';
import { listToTree, TreeNode } from '../../../@core/util/tree-node';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 权限ID */
  @Input() id: string;
  /** 应用编码 */
  @Input() appCode: string;
  /** 编辑表单 */
  editForm: FormGroup;
  /** 应用下拉框数据 */
  applications: TreeNode[] = [];

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private permissionService: PermissionService,
              private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applications = [];
    // // 初始化应用下拉框
    this.applicationService.findAll()
      .subscribe((res: ResponseResultModel) => {
        this.applications = listToTree(res.result.list);
        // 所有需加载的资源都已加载完成，初始化表单
        if (this.id !== this.global.INSERT_FLAG) {
          this.initUpdate();
        } else {
          this.initSave();
        }
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      code: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      name: [null, Validators.required],
      url: [null, Validators.required],
      type: [null, Validators.required],
      status: [null, Validators.required],
      appCode: [null, Validators.required],
      remark: [null, Validators.maxLength(250)],
      version: [null]
    });
  }

  /**
   * 新增表单初始化
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.permissionService.insert(params);
    };
    // 添加异步验证，验证code是否存在，错误标识 existing
    this.editForm.get('code').setAsyncValidators(abstractValidate((code: string) => {
      return this.permissionService.checkCode(code);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      code: null,
      name: null,
      url: null,
      type: this.global.PERMISSION_AUTHOR,
      status: this.global.STATUS_ON,
      appCode: this.appCode,
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
      return this.permissionService.update(params);
    };
    // 获取应用信息初始化表单
    this.permissionService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: PermissionModel = res.result;
        this.editForm.get('code').clearAsyncValidators();
        // 表单重置
        this.editForm.reset({
          id: model.id,
          code: model.code,
          name: model.name,
          url: model.url,
          type: model.type,
          status: model.status,
          appCode: model.appCode,
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
