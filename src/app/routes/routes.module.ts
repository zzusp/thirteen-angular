import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { RoleComponent } from './role/role.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { GroupComponent } from './group/group.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { BizTypeComponent } from './biz-type/biz-type.component';
import { DictComponent } from './dict/dict.component';
import { ApplicationComponent } from './application/application.component';
import { PermissionComponent } from './permission/permission.component';
import { LogLoginComponent } from './log-login/log-login.component';
import { LogOperationComponent } from './log-operation/log-operation.component';
import { ApplicationEditComponent } from './application/application-edit/application-edit.component';
import { BizTypeEditComponent } from './biz-type/biz-type-edit/biz-type-edit.component';
import { DictEditComponent } from './dict/dict-edit/dict-edit.component';
import { PermissionEditComponent } from './permission/permission-edit/permission-edit.component';
import { RoleAuthorizeComponent } from './role/role-authorize/role-authorize.component';
import { LogLoginDetailComponent } from './log-login/log-login-detail/log-login-detail.component';
import { LogOperationDetailComponent } from './log-operation/log-operation-detail/log-operation-detail.component';
import { DeptComponent } from './dept/dept.component';
import { DeptEditComponent } from './dept/dept-edit/dept-edit.component';
import { DmTableComponent } from './dm-table/dm-table.component';
import { DmTableEditComponent } from './dm-table/dm-table-edit/dm-table-edit.component';

// 权限管理系统下所有需动态加载的子组件（弹出框等）
const SYSTEM_MODEL_COMPONENT = [
  RoleEditComponent,
  DeptEditComponent,
  GroupEditComponent,
  ApplicationEditComponent,
  BizTypeEditComponent,
  DictEditComponent,
  PermissionEditComponent,
  LogLoginDetailComponent,
  LogOperationDetailComponent,
  DmTableEditComponent
];

// routes下所有组件
const ROUTES_COMPONENT = [
  DashboardComponent,
  ProfileComponent,
  UserComponent,
  UserEditComponent,
  RoleComponent,
  RoleAuthorizeComponent,
  DeptComponent,
  GroupComponent,
  BizTypeComponent,
  DictComponent,
  ApplicationComponent,
  PermissionComponent,
  LogLoginComponent,
  LogOperationComponent,
  DmTableComponent,
  ...SYSTEM_MODEL_COMPONENT
];

@NgModule({
  imports: [
    CommonModule,
    /** 导入共享模块 **/
    SharedModule,
    /** 导入路由配置模块 **/
    RoutesRoutingModule
  ],
  declarations: [
    ...ROUTES_COMPONENT
  ],
  entryComponents: [
    ...SYSTEM_MODEL_COMPONENT
  ]
})
export class RoutesModule {
}
