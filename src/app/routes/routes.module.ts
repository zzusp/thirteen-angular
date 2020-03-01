import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SystemComponent } from './system/system.component';
import { ProfileComponent } from './profile/profile.component';
import { RentalComponent } from './rental/rental.component';

// routes下所有组件
const ROUTES_COMPONENT = [
  DashboardComponent,
  ProfileComponent,
  SystemComponent,
  RentalComponent
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
  ]
})
export class RoutesModule {
}
