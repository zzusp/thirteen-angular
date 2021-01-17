import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from '../@layout/layout-default/layout-default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutNavComponent } from '../@layout/layout-nav/layout-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { RoleComponent } from './role/role.component';
import { RoleAuthorizeComponent } from './role/role-authorize/role-authorize.component';
import { DeptComponent } from './dept/dept.component';
import { GroupComponent } from './group/group.component';
import { ApplicationComponent } from './application/application.component';
import { PermissionComponent } from './permission/permission.component';
import { BizTypeComponent } from './biz-type/biz-type.component';
import { DictComponent } from './dict/dict.component';
import { LogLoginComponent } from './log-login/log-login.component';
import { LogOperationComponent } from './log-operation/log-operation.component';
import { DmTableComponent } from './dm-table/dm-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'system',
    pathMatch: 'full'
  },
  {
    path: 'system',
    component: LayoutDefaultComponent,
    data: {
      breadcrumb: '首页'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: '仪表盘'
        }
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
      },
      {
        path: 'dm-table',
        component: DmTableComponent,
        data: {
          breadcrumb: '表配置'
        }
      }
    ]
  },
  {
    path: 'profile',
    component: LayoutNavComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
        data: {
          breadcrumb: '个人中心'
        },
        loadChildren: './profile/profile.module#ProfileModule'
      }
    ]
  },
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'
  }
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, config)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutesRoutingModule {
}
