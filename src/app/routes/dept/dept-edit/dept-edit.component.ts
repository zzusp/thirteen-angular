import { Component, Input, OnInit } from '@angular/core';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listToTree, TreeNode } from '../../../@core/util/tree-node';
import { RoleModel } from '../../role/role.model';
import { forkJoin, Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { abstractValidate } from '../../../@core/util/custom-validators';
import { DeptModel } from '../dept.model';
import { NzModalRef } from 'ng-zorro-antd';
import { DeptService } from '../dept.service';
import { RoleService } from '../../role/role.service';

@Component({
  selector: 'app-dept-edit',
  templateUrl: './dept-edit.component.html',
  styleUrls: ['./dept-edit.component.scss']
})
export class DeptEditComponent implements OnInit {

  /** 全局常量 */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 部门ID */
  @Input() id: string;
  /** 编辑表单 */
  editForm: FormGroup;
  /** 上级下拉框 */
  depts: TreeNode[] = [];
  /** 角色下拉框数据 */
  roleModels: RoleModel[];
  /** 选中的角色编码数组 */
  selectRoles: string[];

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private deptService: DeptService,
              private roleService: RoleService) {
  }

  ngOnInit() {
    this.roleModels = [];
    // 初始化上级下拉框，角色下拉框
    const deptsReq = this.deptService.findAll();
    const rolesReq = this.roleService.findAll();
    // 发出请求
    forkJoin([deptsReq, rolesReq])
      .subscribe((results: ResponseResultModel[]) => {
        const deptsRes = results[0];
        const roleRes = results[1];
        this.depts = listToTree(deptsRes.result.list);
        this.roleModels = roleRes.result.list;
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
      shortName: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(10),
      ])],
      orderNum: [null, Validators.required],
      status: [null, Validators.required],
      pCode: [null],
      deptRoles: [[]],
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
      return this.deptService.insert(params);
    };
    // 添加异步验证，验证code是否存在，错误标识 existing
    this.editForm.get('code').setAsyncValidators(abstractValidate((code: string) => {
      return this.deptService.checkCode(code);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      code: null,
      name: null,
      shortName: null,
      orderNum: null,
      status: this.global.STATUS_ON,
      pCode: this.global.ROOT_PARENT_CODE,
      deptRoles: [],
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
      return this.deptService.update(params);
    };
    // 获取部门信息初始化表单
    this.deptService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: DeptModel = res.result;
        this.editForm.get('code').clearAsyncValidators();
        // 表单重置
        this.editForm.reset({
          id: model.id,
          code: model.code,
          name: model.name,
          shortName: model.shortName,
          orderNum: model.orderNum,
          status: model.status,
          pCode: model.pCode,
          deptRoles: model.deptRoles,
          remark: model.remark,
          version: model.version
        });
        if (model.deptRoles != null) {
          // 设置已选中的角色
          this.selectRoles = model.deptRoles.map(v => {
            return v.roleCode;
          });
        }
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
      // 判断上级编码是否为null
      if (this.editForm.get('pCode').value === null) {
        // 如果上级编码为null时，设置为根结点编码
        this.editForm.get('pCode').setValue(this.global.ROOT_PARENT_CODE);
      }
      if (this.selectRoles != null) {
        // 设置选中角色
        this.editForm.get('deptRoles').setValue(this.selectRoles.map(v => {
          return {'roleCode': v};
        }));
      }
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
