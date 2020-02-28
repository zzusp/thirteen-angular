import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { PasswordEditComponent } from './password-edit/password-edit.component';

// 个人中心下所有子组件
const PROFILE_COMPONENT = [
  ProfileSettingComponent,
  PasswordEditComponent
];

@NgModule({
  declarations: [
    ...PROFILE_COMPONENT
  ],
  imports: [
    CommonModule,
    /** 导入共享模块 **/
    SharedModule,
    /** 导入路由配置模块 **/
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
