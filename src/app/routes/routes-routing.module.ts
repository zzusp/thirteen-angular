import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from '../@layout/layout-default/layout-default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutNavComponent } from '../@layout/layout-nav/layout-nav.component';
import { SystemComponent } from './system/system.component';
import { ProfileComponent } from './profile/profile.component';
import { RentalComponent } from './rental/rental.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutNavComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        data: {
          breadcrumb: '仪表盘'
        },
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          breadcrumb: '个人中心'
        },
        loadChildren: './profile/profile.module#ProfileModule'
      }
    ]
  },
  {
    path: 'app',
    component: LayoutDefaultComponent,
    children: [
      {
        path: 'system',
        component: SystemComponent,
        data: {
          breadcrumb: '首页'
        },
        loadChildren: './system/system.module#SystemModule'
      },
      {
        path: 'rental',
        component: RentalComponent,
        data: {
          breadcrumb: '首页'
        },
        loadChildren: './rental/rental.module#RentalModule'
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
