import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
import { LoginService } from '../pages/login/login.service';
import { LayoutService } from '../../@layout/@layout.service';
import { applicationToSidebar, LayoutData, UserBlockInfo } from '../../@layout/interface/layout-data';
import { UserModel } from '../system/user/user.model';
import { ApplicationModel } from '../system/application/application.model';
import { getUserInfo } from '../../@core/util/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();

  /**
   * 用户信息块
   */
  userBlock: UserBlockInfo;

  constructor(private loginService: LoginService,
              private layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    const result: UserModel = getUserInfo();
    // 判断localStorage中的用户信息是否为空
    if (!result) {
      // 跳转到首页
      this.router.navigate(['/']);
    } else {
      this.userBlock = {
        name: result.name,
        photo: result.photo,
        role: result.roles.map((role) => {
          return role.name;
        }).join('，')
      };
      result.applications.forEach((application: ApplicationModel) => {
        if (application.type === this.global.APPLICATION_SERVICE
          && application.code === this.global.RENTAL_SERVER_CODE) {
          this.resetLayout(result.applications, application.id);
        }
      });
    }
  }

  /**
   * 重置布局数据
   *
   * @param applications
   * @param id
   */
  private resetLayout(applications: ApplicationModel[], id: string = GlobalConstants.getInstance().ROOT_PARENT_CODE) {
    const layoutData: LayoutData = {
      userBlock: this.userBlock,
      sidebarMenu: applicationToSidebar(applications, id)
    };
    this.layoutService.setLayoutData(layoutData);
  }

}
