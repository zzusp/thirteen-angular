import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { ApplicationComponent } from './application/application.component';
import { PermissionComponent } from './permission/permission.component';
import { BizTypeComponent } from './biz-type/biz-type.component';
import { DictComponent } from './dict/dict.component';
import { LogLoginComponent } from './log-login/log-login.component';
import { LogOperationComponent } from './log-operation/log-operation.component';
import { RoleAuthorizeComponent } from './role/role-authorize/role-authorize.component';
import { DeptComponent } from './dept/dept.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dept',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserComponent,
    data: {
      breadcrumb: '用户管理'
    }
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    data: {
      breadcrumb: '用户编辑'
    }
  },
  {
    path: 'role',
    component: RoleComponent,
    data: {
      breadcrumb: '角色管理'
    }
  },
  {
    path: 'role-authorize/:id',
    component: RoleAuthorizeComponent,
    data: {
      breadcrumb: '角色授权'
    }
  },
  {
    path: 'dept',
    component: DeptComponent,
    data: {
      breadcrumb: '部门管理'
    }
  },
  {
    path: 'group',
    component: GroupComponent,
    data: {
      breadcrumb: '组织管理'
    }
  },
  {
    path: 'application',
    component: ApplicationComponent,
    data: {
      breadcrumb: '应用管理'
    }
  },
  {
    path: 'permission',
    component: PermissionComponent,
    data: {
      breadcrumb: '权限管理'
    }
  },
  {
    path: 'biz-type',
    component: BizTypeComponent,
    data: {
      breadcrumb: '业务类型'
    }
  },
  {
    path: 'dict',
    component: DictComponent,
    data: {
      breadcrumb: '数据字典'
    }
  },
  {
    path: 'log-login',
    component: LogLoginComponent,
    data: {
      breadcrumb: '登陆日志'
    }
  },
  {
    path: 'log-operation',
    component: LogOperationComponent,
    data: {
      breadcrumb: '操作日志'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SystemRoutingModule {
}
