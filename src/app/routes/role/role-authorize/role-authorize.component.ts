import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { RoleService } from '../role.service';
import { forkJoin } from 'rxjs';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { RoleModel } from '../role.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TreeTableDataModel, TreeTableRowModel } from '../../../shared/tree-table/models/tree-table-data.model';
import { TreeTableConfigModel } from '../../../shared/tree-table/models/tree-table-config.model';
import { TreeTableColumnModel } from '../../../shared/tree-table/models/tree-table-columns.model';
import { listToBaseTree } from '../../../@core/util/tree-node';
import { ApplicationService } from '../../application/application.service';
import { PermissionService } from '../../permission/permission.service';
import { mergeMap } from 'rxjs/operators';
import { ApplicationModel } from '../../application/application.model';
import { PermissionModel } from '../../permission/permission.model';
import { TreeTableService } from '../../../shared/tree-table/services/tree-table.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-role-authorize',
  templateUrl: './role-authorize.component.html',
  styleUrls: ['./role-authorize.component.scss']
})
export class RoleAuthorizeComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 路由参数 */
  routeParams: any = {id: null};
  /** tree-table配置 */
  config: TreeTableConfigModel;
  /** tree-table列配置 */
  columns: TreeTableColumnModel[];
  /** tree-table数据源 */
  data: TreeTableDataModel;
  /** 类型 */
  @ViewChild('rowType', {read: TemplateRef, static: true}) rowType: TemplateRef<any>;
  /** 图标 */
  @ViewChild('rowIcon', {read: TemplateRef, static: true}) rowIcon: TemplateRef<any>;
  /** 状态 */
  @ViewChild('rowStatus', {read: TemplateRef, static: true}) rowStatus: TemplateRef<any>;
  /** 权限 */
  @ViewChild('rowPermission', {read: TemplateRef, static: true}) rowPermission: TemplateRef<any>;
  /** 权限选项 */
  permissionCodes: string[];
  /** 编辑表单 */
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private appService: ApplicationService,
              private permissionService: PermissionService,
              private roleService: RoleService,
              private treeTableService: TreeTableService,
              private location: Location) {
  }


  ngOnInit() {
    // 初始化tree-table配置
    this.config = new TreeTableConfigModel({
      checkAble: true,
      level: 1,
      onCheckChange: (row: TreeTableRowModel) => {
        // 使用临时变量，避免双向绑定的变量频繁变化
        const codes = this.permissionCodes;
        // 取消选中应用时级联取消选中其下的权限
        this.cascadePermissions(row, codes);
        // 重新设置已选中的权限编码数组
        this.permissionCodes = [...[], ...codes];
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
        template: this.rowStatus
      },
      {
        title: '权限',
        template: this.rowPermission
      }
    ];
    // 初始化tree-table的数据
    this.data = new TreeTableDataModel([]);
    // 已选中权限编码数组初始化
    this.permissionCodes = [];
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      code: [null],
      name: [null],
      apps: [[]],
      permissions: [[]],
      status: [null],
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
    // 初始化应用权限table-tree
    const appReq = this.appService.findAll();
    const permissioneReq = this.permissionService.findAll();
    forkJoin([appReq, permissioneReq])
      .pipe(
        mergeMap((results: ResponseResultModel[]) => {
          const appRes = results[0];
          const permissionRes = results[1];
          if (appRes.result) {
            appRes.result.list.forEach((app: ApplicationModel) => {
              app.permissions = [];
              if (permissionRes.result) {
                permissionRes.result.list.forEach((permission: PermissionModel) => {
                  if (app.code === permission.appCode) {
                    app.permissions.push(permission);
                  }
                });
              }
            });
            // 初始化应用table-tree
            this.data = new TreeTableDataModel(listToBaseTree(appRes.result.list));
          }
          return this.roleService.findDetailById(this.routeParams.id);
        })
      ).subscribe((res: ResponseResultModel) => {
      // 获取角色权限信息初始化表单
      const model: RoleModel = res.result;
      // 表单重置
      this.editForm.reset({
        id: model.id,
        code: model.code,
        name: model.name,
        apps: model.apps,
        permissions: model.permissions,
        status: model.status,
        remark: model.remark
      });
      if ('admin' === model.code) {
        this.setTreeTableAllChecked(this.data.datas);

      } else {
        if (model.apps) {
          // 设置treeTable的默认值
          this.setTreeTableDefaultValue(this.data.datas, model.apps);
        }
        if (model.permissions) {
          //  设置权限默认值
          this.setCheckedPermission(model.permissions);
        }
      }
    });
  }

  // 表单提交（授权）
  submitForm() {
    this.editForm.get('apps').setValue(this.getCheckedApplication());
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
   * @param codes
   */
  cascadePermissions(row: TreeTableRowModel, codes: string[]): void {
    // 取消选中应用时级联取消选中其下的权限
    if (row['permissions'] && row['permissions'].length > 0) {
      row['permissions'].forEach((v: any) => {
        // 获取权限编码在已选中权限编码数组中的下标
        const index = codes.indexOf(v.code);
        if (!row.checked && index >= 0) {
          // 删除指定下标权限
          codes.splice(index, 1);
        } else if (!!row.checked && index < 0) {
          codes.push(v.code);
        }
      });
    }
    if (this.treeTableService.hasChildren(row)) {
      row.children.forEach((r: TreeTableRowModel) => {
        this.cascadePermissions(r, codes);
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
    // 获取权限编码在已选中权限编码数组中的下标
    const index = this.permissionCodes.indexOf(value);
    if (index >= 0) {
      // 删除指定下标权限
      this.permissionCodes.splice(index, 1);
    } else {
      // 添加权限编码到已选中权限编码数组中
      this.permissionCodes.push(value);
      // 判断应用是否已勾选，如果未勾选则勾选
      if (!row.checked) {
        row.checked = true;
      }
    }
  }

  /**
   * 设置选中权限
   *
   * @param rolePermissions 角色权限数组
   */
  setCheckedPermission(rolePermissions: any[]): void {
    // 使用临时变量，用来存储已设置过的权限，避免双向绑定的变量频繁变化
    const temp: string[] = [];
    // 遍历权限数组
    rolePermissions.forEach((v: any) => {
      temp.push(v.permissionCode);
    });
    // 设置已选中的权限编码
    this.permissionCodes = [...this.permissionCodes, ...temp];
  }

  /**
   * 设置tree-table默认全部勾选
   *
   * @param items
   */
  setTreeTableAllChecked(items: TreeTableRowModel[]) {
    items.forEach((item: TreeTableRowModel) => {
      item.checked = true;
      if (item['permissions'] != null) {
        let rolePermissions = [];
        item['permissions'].forEach(v => {
          rolePermissions.push({permissionCode: v['code']});
        });
        this.setCheckedPermission(rolePermissions);
      }
      if (item.children && item.children.length > 0) {
        this.setTreeTableAllChecked(item.children);
      }
    });
  }

  /**
   * 设置tree-table默认选中值
   *
   * @param items
   * @param defaultModules
   */
  setTreeTableDefaultValue(items: TreeTableRowModel[], defaultModules: any[]) {
    items.forEach((item: TreeTableRowModel) => {
      defaultModules.forEach((module, index) => {
        if (item['code'] === module.appCode) {
          item.checked = true;
          defaultModules.splice(index, 1);
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
    this.permissionCodes.forEach(v => {
      permissions.push({permissionCode: v});
    });
    return permissions;
  }

  /**
   * 获取选中应用
   */
  getCheckedApplication(): any[] {
    const modules: any[] = [];
    this.treeTableService.getCheckedData(this.data, 'code').forEach(moduleCode => {
      modules.push({appCode: moduleCode});
    });
    return modules;
  }

}
