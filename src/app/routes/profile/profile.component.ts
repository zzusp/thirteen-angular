import { Component, OnInit } from '@angular/core';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { UserModel } from '../user/user.model';
import { applicationToSidebar, LayoutData } from '../../@layout/interface/layout-data';
import { setUserInfo } from '../../@core/util/user-info';
import { LoginService } from '../pages/login/login.service';
import { LayoutService } from '../../@layout/@layout.service';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Component({
  selector: 'app-profile',
  template: `
    <router-outlet></router-outlet>`,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();

  constructor(private loginService: LoginService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    // 从服务器段获取到当前用户信息，更新布局数据
    this.loginService.getCurrentUser()
      .subscribe((res: ResponseResultModel) => {
        if (res.result) {
          const result: UserModel = res.result;
          // 更新布局数据
          const layoutData: LayoutData = {
            userBlock: {
              name: result.name,
              photo: result.photo,
              role: result.roles.map((role) => {
                return role.name;
              }).join('，')
            },
            sidebarMenu: applicationToSidebar(result.applications, this.global.AUTHORIZATION_SERVER_CODE)
          };
          this.layoutService.setLayoutData(layoutData);
          // 更新localStorage中的用户信息
          setUserInfo(result);
        }
      });
  }

}
