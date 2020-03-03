import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LayoutConfig } from '../interface/layout-config';
import { LayoutService } from '../@layout.service';
import { LoginService } from '../../routes/pages/login/login.service';
import { applicationToSidebar, LayoutData } from '../interface/layout-data';
import { ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { BreadcrumbOption, NZ_ROUTE_DATA_BREADCRUMB, NzBreadCrumbComponent } from 'ng-zorro-antd';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { UserModel } from '../../routes/user/user.model';
import { setUserInfo } from '../../@core/util/user-info';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss']
})
export class LayoutDefaultComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 布局配置 */
  layoutConfig: LayoutConfig;
  /** 布局数据 */
  layoutData: LayoutData;
  /** ng-zorro面包屑组件对象 */
  @ViewChild('breadcrumb') breadcrumb: NzBreadCrumbComponent;

  constructor(private layoutService: LayoutService,
              private loginService: LoginService,
              private injector: Injector) {
  }

  ngOnInit() {
    this.initUserInfo();
    // 获取布局配置
    this.layoutService.getLayoutConfig()
      .subscribe((config: LayoutConfig) => this.layoutConfig = config);
    // 获取布局数据
    this.layoutService.getLayoutData()
      .subscribe((data: LayoutData) => this.layoutData = data);
    // 获取当前激活的路由
    const activatedRoute = this.injector.get(ActivatedRoute);
    // 由激活的路由初始化面包屑
    // （ng-zorro面包屑组件用在子路由中的组件时，需进行如下处理；否则无默认值）
    this.breadcrumb.breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
  }

  initUserInfo() {
    // 从服务器段获取到当前用户信息，更新布局数据
    this.loginService.getCurrentUser()
      .subscribe((res: ResponseResultModel) => {
        if (res.result) {
          const result: UserModel = res.result;
          if (result.applications) {
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
          }
          // 记录当前用户信息
          setUserInfo(result);
        }
      });
  }

  /**
   * 由路由获取面包屑内容
   * （ng-zorro面包屑组件用在子路由中的组件时，需进行如下处理；否则无默认值）
   *
   * @param route
   * @param url
   * @param breadcrumbs
   */
  getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbOption[] = []): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;
    // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
        // Parse this layer and generate a breadcrumb item.
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        const nextUrl = routeURL ? url + `/${routeURL}` : routeURL;
        // If have data, go to generate a breadcrumb for it.
        if (child.snapshot.data.hasOwnProperty(NZ_ROUTE_DATA_BREADCRUMB)) {
          const breadcrumb: BreadcrumbOption = {
            label: child.snapshot.data[NZ_ROUTE_DATA_BREADCRUMB] || 'Breadcrumb',
            params: child.snapshot.params,
            url: nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }
        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }
  }

}
