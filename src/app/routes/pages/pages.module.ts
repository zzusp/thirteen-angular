import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { Page404Component } from './404/404.component';
import { Page500Component } from './500/500.component';

// pages下所有组件
const PAGES_COMPONENT = [
  Page404Component,
  Page500Component,
  LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    /** 导入共享模块 **/
    SharedModule,
    /** 导入子路由配置模块 **/
    PagesRoutingModule
  ],
  declarations: [
    ...PAGES_COMPONENT
  ]
})
export class PagesModule { }
