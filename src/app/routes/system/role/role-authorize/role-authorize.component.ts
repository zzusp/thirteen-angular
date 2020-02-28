import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { RoleService } from '../role.service';
import { forkJoin } from 'rxjs';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { RoleModel } from '../role.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TreeTableDataModel, TreeTableRowModel } from '../../../../shared/tree-table/models/tree-table-data.model';
import { TreeTableConfigModel } from '../../../../shared/tree-table/models/tree-table-config.model';
import { TreeTableColumnModel } from '../../../../shared/tree-table/models/tree-table-columns.model';
import { listToBaseTree } from '../../../../@core/util/tree-node';
import { ApplicationService } from '../../application/application.service';
import { PermissionService } from '../../permission/permission.service';
import { mergeMap } from 'rxjs/operators';
import { ApplicationModel } from '../../application/application.model';
import { PermissionModel } from '../../permission/permission.model';
import { TreeTableService } from '../../../../shared/tree-table/services/tree-table.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-role-authorize',
  templateUrl: './role-authorize.component.html',
  styleUrls: ['./role-authorize.component.scss']
})
export class RoleAuthorizeComponent implements OnInit {

  /**
   * 全局常量
   */
  global: GlobalConstants = GlobalConstants.getInstance();
  /**
   * 路由参数
   */
  routeParams: any = {id: null};
  /**
   * tree-table配置
   */
  config: TreeTableConfigModel;
  /**
   * tree-table列配置
   */
  columns: TreeTableColumnModel[];
  /**
   * tree-table数据源
   */
  data: TreeTableDataModel;
  /**
   * 类型
   */
  @ViewChild('rowType', {read: TemplateRef}) rowType: TemplateRef<any>;
  /**
   * 图标
   */
  @ViewChild('rowIcon', {read: TemplateRef}) rowIcon: TemplateRef<any>;
  /**
   * 状态
   */
  @ViewChild('rowIsActive', {read: TemplateRef}) rowIsActive: TemplateRef<any>;
  /**
   * 权限
   */
  @ViewChild('rowPermission', {read: TemplateRef}) rowPermission: TemplateRef<any>;
  /**
   * 权限选项
   */
  permissionIds: string[];
  /**
   * 编辑表单
   */
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private applicationService: ApplicationService,
              private permissionService: PermissionService,
              private roleService: RoleService,
              private treeTableService: TreeTableService,
              private location: Location) { }


  ngOnInit() {
    // 初始化tree-table配置
    this.config = new TreeTableConfigModel({
      checkable: true,
      level: 1,
      onCheckChange: (row: TreeTableRowModel) => {
        // 使用临时变量，避免双向绑定的变量频繁变化
        const ids = this.permissionIds;
        // 取消选中应用时级联取消选中其下的权限
        this.cascadePermissions(row, ids);
        // 重新设置已选中的权限ID数组
        this.permissionIds = [...[], ...ids];
      }
    });
    // 初始化tree-table列配置
    this.columns = [
      {
        title: '全称',
        key: 'name'
      },
      {
        title: '类型',
        template: this.rowType
      },
      {
        title: '状态',
        template: this.rowIsActive
      },
      {
        title: '权限',
        template: this.rowPermission
      }
    ];
    // 初始化tree-table的数据
    this.data = new TreeTableDataModel([]);
    // 已选中权限ID数组初始化
    this.permissionIds = [];
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      code: [null],
      name: [null],
      applications: [[]],
      permissions: [[]],
      isActive: [null],
      remark: [null]
    });
    this.editForm.disable();
    // 获取路由参数
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.routeParams.id = params.get('id');
      // 所有需加载的资源都已加载完成，初始化表单
      this.initAuthorize();
    });
  }

  /**
   * 初始化授权
   */
  initAuthorize() {
    //  初始化应用权限table-tree
    const applicationReq = this.applicationService.listAll();
    const permissioneReq = this.permissionService.listAll();
    forkJoin(applicationReq, permissioneReq)
      .pipe(
        mergeMap((results: ResponseResultModel[]) => {
          const applicationRes = results[0];
          const permissionRes = results[1];
          if (applicationRes.result) {
            applicationRes.result.list.forEach((application: ApplicationModel) => {
              application.permissions = [];
              if (permissionRes.result) {
                permissionRes.result.list.forEach((permission: PermissionModel) => {
                  if (application.id === permission.application.id) {
                    application.permissions.push(permission);
                  }
                });
              }
            });
            // 初始化应用table-tree
            this.data = new TreeTableDataModel(listToBaseTree(applicationRes.result.list));
          }
          return this.roleService.getDetail(this.routeParams.id);
        })
      ).subscribe((res: ResponseResultModel) => {
      // 获取角色权限信息初始化表单
      const model: RoleModel = res.result;
      // 表单重置
      this.editForm.reset({
        id: model.id,
        code: model.code,
        name: model.name,
        applications: model.applications,
        permissions: model.permissions,
        isActive: model.isActive,
        remark: model.remark
      });
      if (model.applications) {
        // 设置treeTable的默认值
        this.setTreeTableDefaultValue(this.data.datas, model.applications);
      }
      if (model.permissions) {
        //  设置权限默认值
        this.setCheckedPermission(model.permissions);
      }
    });
  }

  // 表单提交（授权）
  submitForm() {
    this.editForm.get('applications').setValue(this.getCheckedApplication());
    this.editForm.get('permissions').setValue(this.getCheckedPermission());
    this.roleService.authorize(this.editForm.value).subscribe((res: ResponseResultModel) => {
      // 清空表单
      this.editForm.reset();
      // 返回上一页
      this.goBack();
    });
  }

  // 返回上一页
  goBack(): void {
    this.location.back();
  }

  /**
   * 级联取消自身其下的权限及下级拥有的权限
   *
   * @param row
   * @param ids
   */
  cascadePermissions(row: TreeTableRowModel, ids: string[]): void {
    // 取消选中应用时级联取消选中其下的权限
    if (row['permissions'] && row['permissions'].length > 0) {
      row['permissions'].forEach((permission: PermissionModel) => {
        // 获取权限ID在已选中权限ID数组中的下标
        const index = ids.indexOf(permission.id);
        if (!row.checked && index >= 0) {
          // 删除指定下标权限
          ids.splice(index, 1);
        } else if (!!row.checked && index < 0) {
          ids.push(permission.id);
        }
      });
    }
    if (this.treeTableService.hasChildren(row)) {
      row.children.forEach((r: TreeTableRowModel) => {
        this.cascadePermissions(r, ids);
      });
    }
  }

  /**
   * 权限变化
   *
   * @param row
   * @param value
   */
  permissionChange(row: TreeTableRowModel, value: string): void {
    // 获取权限ID在已选中权限ID数组中的下标
    const index = this.permissionIds.indexOf(value);
    if (index >= 0) {
      // 删除指定下标权限
      this.permissionIds.splice(index, 1);
    } else {
      // 添加权限ID到已选中权限ID数组中
      this.permissionIds.push(value);
      // 判断应用是否已勾选，如果未勾选则勾选
      if (!row.checked) {
        row.checked = true;
      }
    }
  }

  /**
   * 设置选中权限
   *
   * @param permissions 权限数组
   */
  setCheckedPermission(permissions: PermissionModel[]): void {
    // 使用临时变量，用来存储已设置过的权限，避免双向绑定的变量频繁变化
    const temp: string[] = [];
    // 遍历权限数组
    permissions.forEach((permission: PermissionModel) => {
      temp.push(permission.id);
    });
    // 设置已选中的权限ID
    this.permissionIds = [...[], ...temp];
  }

  /**
   * 设置tree-table默认选中值
   *
   * @param items
   * @param defaultModules
   */
  setTreeTableDefaultValue(items: TreeTableRowModel[], defaultModules: ApplicationModel[]) {
    items.forEach((item: TreeTableRowModel) => {
      defaultModules.forEach((module, index) => {
        if (item['id'] === module.id) {
          item.checked = true;
          defaultModules.slice(index, 1);
        }
        if (item.children && item.children.length > 0) {
          this.setTreeTableDefaultValue(item.children, defaultModules);
        }
      });
    });
  }

  /**
   * 获取选中权限
   */
  getCheckedPermission(): any[] {
    const permissions: any[] = [];
    this.permissionIds.forEach(roleId => {
      permissions.push({id: roleId});
    });
    return permissions;
  }

  /**
   * 获取选中应用
   */
  getCheckedApplication(): any[] {
    const modules: any[] = [];
    this.treeTableService.getCheckedData(this.data, 'id').forEach(moduleId => {
      modules.push({id: moduleId});
    });
    return modules;
  }

}
