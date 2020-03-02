import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './404/404.component';
import { Page500Component } from './500/500.component';

const routes: Routes = [
  {
    path: '404',
    data: {
      breadcrumb: '404未找到'
    },
    component: Page404Component
  },
  {
    path: '500',
    data: {
      breadcrumb: '服务器繁忙'
    },
    component: Page500Component
  },
  {
    path: 'login',
    data: {
      breadcrumb: '登录'
    },
    component: LoginComponent
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
export class PagesRoutingModule {
}
