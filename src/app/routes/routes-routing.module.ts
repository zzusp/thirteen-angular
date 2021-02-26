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
import { RentItemComponent } from './rent/rent-item/rent-item.component';
import { RentItemEditComponent } from './rent/rent-item/rent-item-edit/rent-item-edit.component';
import { RentCategoryComponent } from './rent/rent-category/rent-category.component';
import { RentSpecComponent } from './rent/rent-spec/rent-spec.component';
import { RentContractComponent } from './rent/rent-contract/rent-contract.component';
import { RentRenterComponent } from './rent/rent-renter/rent-renter.component';
import { RentBaseInfoComponent } from './rent/rent-base-info/rent-base-info.component';
import { RentCategoryEditComponent } from './rent/rent-category/rent-category-edit/rent-category-edit.component';
import { RentSpecEditComponent } from './rent/rent-spec/rent-spec-edit/rent-spec-edit.component';
import { RentRenterEditComponent } from './rent/rent-renter/rent-renter-edit/rent-renter-edit.component';
import { RentContractEditComponent } from "./rent/rent-contract/rent-contract-edit/rent-contract-edit.component";

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
        redirectTo: 'dept',
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

const rentRoutes: Routes = [
  {
    path: '',
    redirectTo: 'rent',
    pathMatch: 'full'
  },
  {
    path: 'rent',
    component: LayoutDefaultComponent,
    data: {
      breadcrumb: '首页'
    },
    children: [
      {
        path: '',
        redirectTo: 'rent-item',
        pathMatch: 'full'
      },
      {
        path: 'rent-contract',
        component: RentContractComponent,
        data: {
          breadcrumb: '合同管理'
        }
      },
      {
        path: 'rent-contract-edit/:id',
        component: RentContractEditComponent,
        data: {
          breadcrumb: '合同编辑'
        }
      },
      {
        path: 'rent-renter',
        component: RentRenterComponent,
        data: {
          breadcrumb: '仓库或公司'
        }
      },
      {
        path: 'rent-renter-edit/:id',
        component: RentRenterEditComponent,
        data: {
          breadcrumb: '仓库或公司编辑'
        }
      },
      {
        path: 'rent-item',
        component: RentItemComponent,
        data: {
          breadcrumb: '物品类别'
        }
      },
      {
        path: 'rent-item-edit/:id',
        component: RentItemEditComponent,
        data: {
          breadcrumb: '物品类别编辑'
        }
      },
      {
        path: 'rent-category',
        component: RentCategoryComponent,
        data: {
          breadcrumb: '类别品名'
        }
      },
      {
        path: 'rent-category-edit/:id',
        component: RentCategoryEditComponent,
        data: {
          breadcrumb: '类别品名编辑'
        }
      },
      {
        path: 'rent-spec',
        component: RentSpecComponent,
        data: {
          breadcrumb: '物品规格'
        }
      },
      {
        path: 'rent-spec-edit/:id',
        component: RentSpecEditComponent,
        data: {
          breadcrumb: '物品规格编辑'
        }
      },
      {
        path: 'rent-base-info',
        component: RentBaseInfoComponent,
        data: {
          breadcrumb: '系统初始化'
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
    RouterModule.forRoot(rentRoutes, config)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutesRoutingModule {
}
