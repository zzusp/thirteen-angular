import { Component, Input, OnInit } from '@angular/core';
import { LayoutConfig } from '../interface/layout-config';
import { LayoutService } from '../@layout.service';
import { LayoutData } from '../interface/layout-data';
import { LoginService } from '../../routes/pages/login/login.service';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { Router } from '@angular/router';
import { removeUserInfo } from '../../@core/util/user-info';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** 布局配置 */
  layoutConfig: LayoutConfig;
  /** 布局数据 */
  layoutData: LayoutData;
  /**
   * 显示/隐藏用户信息的按钮是否显示，默认隐藏
   */
  @Input() userBlockBtnVisible: boolean = false;

  constructor(private layoutService: LayoutService,
              private loginService: LoginService,
              private messageService: NzMessageService,
              private router: Router) {
  }

  ngOnInit() {
    // 获取布局配置
    this.layoutService.getLayoutConfig()
      .subscribe((config: LayoutConfig) => this.layoutConfig = config);
    // 获取布局数据
    this.layoutService.getLayoutData()
      .subscribe((data: LayoutData) => this.layoutData = data);
  }

  /**
   * 折叠/展开 左侧菜单
   */
  toggleCollapse() {
    this.layoutConfig.collapsed = !this.layoutConfig.collapsed;
    this.layoutService.setLayoutConfig(this.layoutConfig);
  }

  /**
   * 显示/隐藏 用户信息
   */
  toggleUserBlock() {
    this.layoutConfig.userBlockVisible = !this.layoutConfig.userBlockVisible;
    this.layoutService.setLayoutConfig(this.layoutConfig);
  }

  /**
   * 跳转
   *
   * @param url 目标路径
   */
  goTo(url: string) {
    this.router.navigate([url]);
  }

  /**
   * 刷新拦截链
   */
  reloadFilterChains() {
    this.loginService.reloadFilterChains().subscribe((res: ResponseResultModel) => {
      if (res.status === 200) {
        this.messageService.success('最新权限已成功加载至拦截链中');
      }
    });
  }

  /**
   * 登出
   */
  logout() {
    this.loginService.logout().subscribe((res: ResponseResultModel) => {
      console.log('logout');
    });
    // 不论退出登录是否成功，清除当前用户信息，返回登录页
    removeUserInfo();
    this.router.navigate(['/pages/login']);
  }

}
