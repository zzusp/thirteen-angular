import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
// 手动引入
import { Location } from '@angular/common';
import { UserModel } from '../user.model';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { forkJoin, Observable } from 'rxjs';
import { abstractValidate } from '../../../../@core/util/custom-validators';
import { GroupService } from '../../group/group.service';
import { RoleService } from '../../role/role.service';
import { RoleModel } from '../../role/role.model';
import { listToTree, TreeNode } from '../../../../@core/util/tree-node';
import {BizTypeService} from '../../biz-type/biz-type.service';
import {DictModel} from '../../dict/dict.model';
import { DeptService } from '../../dept/dept.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  /**
   * 全局常量
   */
  global: GlobalConstants = GlobalConstants.getInstance();
  /**
   * 请求
   */
  request: (params: any) => Observable<any>;
  /**
   * 路由参数
   */
  routeParams: any = {id: null};
  /**
   * 编辑表单
   */
  editForm: FormGroup;
  /**
   * 标题
   */
  title: string;
  /**
   * 部门下拉框数据
   */
  depts: TreeNode[] = [];
  /**
   * 组织架构下拉框数据
   */
  groups: TreeNode[] = [];
  /**
   * 性别下拉框数据
   */
  genders: DictModel[];
  /**
   * 角色下拉框数据
   */
  roles: RoleModel[];
  /**
   * 选中的角色ID数组
   */
  selectRoles: string[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private deptService: DeptService,
              private groupService: GroupService,
              private roleService: RoleService,
              private bizTypeService: BizTypeService,
              private fb: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    //  初始化部门下拉框，组织下拉框，角色下拉框
    const deptReq = this.deptService.listAll();
    const groupReq = this.groupService.listAll();
    const bizTypeReq = this.bizTypeService.getByCode(this.global.BIZ_TYPE_GENDER);
    // 发出请求
    forkJoin(deptReq, groupReq, bizTypeReq)
      .subscribe((results: ResponseResultModel[]) => {
        const deptRes = results[0];
        const groupRes = results[1];
        const bizTypeRes = results[2];
        this.depts = listToTree(deptRes.result.list);
        this.groups = listToTree(groupRes.result.list);
        this.genders = bizTypeRes.result.dicts;
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      code: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      account: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      name: [null, Validators.required],
      gender: [null, Validators.required],
      mobile: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      photo: [null],
      isActive: [null, Validators.required],
      dept: this.fb.group({
        id: [null, Validators.required]
      }),
      group: this.fb.group({
        id: [null, Validators.required]
      }),
      roles: [[]],
      remark: [null, Validators.maxLength(250)]
    });
    // 获取路由参数
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.routeParams.id = params.get('id');
      // 所有需加载的资源都已加载完成，初始化表单
      if (this.routeParams.id !== this.global.INSERT_FLAG) {
        this.initUpdate();
      } else {
        this.initSave();
      }
    });
  }

  groupChange($event) {
    this.selectRoles = [];
    // 获取用户信息初始化表单
    this.roleService.listByModel({group: {id: $event}})
      .subscribe((res: ResponseResultModel) => {
        this.roles = res.result.list;
      });
  }

  /**
   * 初始化新增
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.userService.save(params);
    };
    // 设置标题
    this.title = '新增用户信息';
    // 添加异步验证，验证account是否存在，错误标识 existing
    this.editForm.get('code').setAsyncValidators(abstractValidate((code: string) => {
      return this.userService.checkCode(code);
    }));
    this.editForm.get('account').setAsyncValidators(abstractValidate((account: string) => {
      return this.userService.checkAccount(account);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      code: null,
      account: null,
      name: null,
      gender: null,
      mobile: null,
      email: null,
      photo: null,
      isActive: this.global.ACTIVE_ON,
      dept: {
        id: null
      },
      group: {
        id: null
      },
      roles: [],
      remark: null
    });
    this.editForm.get('code').enable();
    this.editForm.get('account').enable();
  }

  /**
   * 初始化更新
   */
  initUpdate() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.userService.update(params);
    };
    // 设置标题
    this.title = '修改用户信息';
    // 获取用户信息初始化表单
    this.userService.getById(this.routeParams.id)
      .subscribe((res: ResponseResultModel) => {
        const model: UserModel = res.result;
        this.editForm.get('code').clearAsyncValidators();
        this.editForm.get('account').clearAsyncValidators();
        // 表单重置
        this.editForm.reset({
          id: model.id,
          code: model.code,
          account: model.account,
          name: model.name,
          gender: model.gender,
          mobile: model.mobile,
          email: model.email,
          photo: model.photo,
          isActive: model.isActive,
          dept: {
            id: model.dept.id
          },
          group: {
            id: model.group.id
          },
          roles: model.roles,
          remark: model.remark
        });
        if (model.roles != null) {
          // 设置已选中的角色
          this.selectRoles = model.roles.map(role => {
            return role.id;
          });
        }
        this.editForm.get('code').disable();
        this.editForm.get('account').disable();
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
      if (this.selectRoles != null) {
        // 设置选中角色
        this.editForm.get('roles').setValue(this.selectRoles.map(roleId => {
          return {id: roleId};
        }));
      }
      this.request(this.editForm.value).subscribe((res: ResponseResultModel) => {
        // 清空表单
        this.editForm.reset();
        // 返回上一页
        this.goBack();
      });
    }
  }

  /**
   * 返回上一页
   */
  goBack() {
    this.location.back();
  }

}
