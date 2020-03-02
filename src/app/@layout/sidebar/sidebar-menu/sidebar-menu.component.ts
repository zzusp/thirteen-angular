import { Component, Input, OnInit } from '@angular/core';
import { SidebarMenuInfo } from '../../interface/layout-data';
import { SidebarService } from '../sidebar.service';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

@Component({
  selector: 'app-sidebar-menu, [app-sidebar-menu]',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 菜单数据 */
  @Input() menuData: SidebarMenuInfo[];

  constructor(protected sidebarService: SidebarService) {
  }

  ngOnInit() {
  }

  /**
   * 通过阻止子标签的点击事件冒泡，影响父标签的点击事件
   *
   * @param $event
   */
  onClick($event: any): void {
    $event.preventDefault();
    // 阻止事件冒泡
    $event.stopPropagation();
  }

  /**
   * 获取路径处理
   */
  getUrl(menu: SidebarMenuInfo): string {
    if (!!menu && !!menu.url) {
      return menu.url;
    } else {
      return '/pages/500';
    }
  }

}
