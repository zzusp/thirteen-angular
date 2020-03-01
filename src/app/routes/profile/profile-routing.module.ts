import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'setting',
    pathMatch: 'full'
  },
  {
    path: 'setting',
    component: ProfileSettingComponent,
    data: {
      breadcrumb: '个人设置'
    }
  },
  {
    path: 'password-edit',
    component: PasswordEditComponent,
    data: {
      breadcrumb: '密码修改'
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
export class ProfileRoutingModule {
}
