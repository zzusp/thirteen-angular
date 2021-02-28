import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
// 手动引入
import { Location } from '@angular/common';
import { UserModel } from '../user.model';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { forkJoin, Observable } from 'rxjs';
import { abstractValidate } from '../../../@core/util/custom-validators';
import { GroupService } from '../../group/group.service';
import { RoleService } from '../../role/role.service';
import { RoleModel } from '../../role/role.model';
import { listToTree, TreeNode } from '../../../@core/util/tree-node';
import { DictModel } from '../../dict/dict.model';
import { DeptService } from '../../dept/dept.service';
import { DictService } from '../../dict/dict.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 路由参数 */
  routeParams: any = {id: null};
  /** 编辑表单 */
  editForm: FormGroup;
  /** 标题 */
  title: string;
  /** 部门下拉框数据 */
  depts: TreeNode[] = [];
  /** 组织架构下拉框数据 */
  groups: TreeNode[] = [];
  /** 性别下拉框数据 */
  genders: DictModel[];
  /** 角色下拉框数据 */
  roles: RoleModel[];
  /** 选中的角色编码数组 */
  selectedRoles: string[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private deptService: DeptService,
              private groupService: GroupService,
              private roleService: RoleService,
              private dictService: DictService,
              private fb: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    // 初始化部门下拉框，组织下拉框，角色下拉框
    const deptReq = this.deptService.findAll();
    const groupReq = this.groupService.findAll();
    const roleReq = this.roleService.findAll();
    const dictReq = this.dictService.findAllByBizTypeCode(this.global.BIZ_TYPE_GENDER);
    // 发出请求
    forkJoin([deptReq, groupReq, roleReq, dictReq])
      .subscribe((results: ResponseResultModel[]) => {
        const deptRes = results[0];
        const groupRes = results[1];
        const roleRes = results[2];
        const dictRes = results[3];
        this.depts = listToTree(deptRes.result.list);
        this.groups = listToTree(groupRes.result.list);
        this.roles = roleRes.result.list;
        this.genders = dictRes.result.list;
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
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
      status: [null, Validators.required],
      deptCode: [null, Validators.required],
      groupCode: [null, Validators.required],
      userRoles: [[]],
      remark: [null, Validators.maxLength(250)],
      version: [null]
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

  /**
   * 初始化新增
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.userService.insert(params);
    };
    // 设置标题
    this.title = '新增用户信息';
    // 添加异步验证，验证account是否存在，错误标识 existing
    this.editForm.get('account').setAsyncValidators(abstractValidate((account: string) => {
      return this.userService.checkAccount(account);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      account: null,
      name: null,
      gender: null,
      mobile: null,
      email: null,
      photo: null,
      status: this.global.STATUS_ON,
      deptCode: null,
      groupCode: null,
      userRoles: [],
      remark: null,
      version: null
    });
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
    this.userService.findById(this.routeParams.id)
      .subscribe((res: ResponseResultModel) => {
        const model: UserModel = res.result;
        this.editForm.get('account').clearAsyncValidators();
        // 表单重置
        this.editForm.reset({
          id: model.id,
          account: model.account,
          name: model.name,
          gender: model.gender,
          mobile: model.mobile,
          email: model.email,
          photo: model.photo,
          status: model.status,
          deptCode: model.deptCode,
          groupCode: model.groupCode,
          userRoles: model.userRoles,
          remark: model.remark,
          version: model.version
        });
        if (model.userRoles != null) {
          // 设置已选中的角色
          this.selectedRoles = model.userRoles.map(v => {
            return v.roleCode;
          });
        }
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
      if (this.selectedRoles != null) {
        // 设置选中角色
        this.editForm.get('userRoles').setValue(this.selectedRoles.map(v => {
          return {roleCode: v};
        }));
      }
      this.request(this.editForm.getRawValue()).subscribe((res: ResponseResultModel) => {
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
