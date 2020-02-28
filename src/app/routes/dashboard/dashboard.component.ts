import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {applicationToSidebar, LayoutData} from '../../@layout/interface/layout-data';
import {LoginService} from '../pages/login/login.service';
import {LayoutService} from '../../@layout/@layout.service';
import {UserModel} from '../system/user/user.model';
import {ApplicationModel} from '../system/application/application.model';
import {GlobalConstants} from '../../@core/constant/GlobalConstants';
import {ResponseResultModel} from '../../@core/net/response-result.model';
import { setUserInfo } from '../../@core/util/user-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * 全局常量
   */
  global: GlobalConstants = GlobalConstants.getInstance();
  /**
   * 用户拥有的应用服务（系统）
   */
  systems: ApplicationModel[] = [];
  /**
   * 颜色数组
   */
  colors: string[] = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#fde3cf', '#ffa940', '#bae637', '#40a9ff', '#ffa39e', '#85a5ff'];

  constructor(private injector: Injector,
              private loginService: LoginService,
              private layoutService: LayoutService) { }

  ngOnInit() {
    // 从服务器段获取到当前用户信息，更新布局数据
    this.loginService.getCurrentUser()
      .subscribe((res: ResponseResultModel) => {
        if (res.result) {
          const result: UserModel = res.result;
          if (result.applications) {
            result.applications.forEach((application: ApplicationModel) => {
              if (application.type === this.global.APPLICATION_SERVICE) {
                this.systems.push(application);
              }
            });
            const layoutData: LayoutData = {
              userBlock: {
                name: result.name,
                photo: result.photo,
                role: result.roles.map((role) => {
                  return role.name; }).join('，')
              },
              sidebarMenu: applicationToSidebar(result.applications, this.global.ROOT_PARENT_ID)
            };
            this.layoutService.setLayoutData(layoutData);
          }
          // 记录当前用户信息
          setUserInfo(result);
        }
      });
  }

  /**
   * 跳转
   *
   * @param id 目标应用ID
   * @param url 目标路径
   */
  private goTo(id: string, url: string) {
    setTimeout(() => {
      this.injector.get(Router).navigateByUrl(this.global.APP_PREFIX + url);
    });
  }

}
