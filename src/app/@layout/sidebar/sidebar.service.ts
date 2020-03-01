import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuInfo } from '../interface/layout-data';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private router: Router) {
  }

  /**
   * 检查是否有自己子菜单
   *
   * @param menu 菜单信息
   */
  hasChildren(menu: SidebarMenuInfo): boolean {
    return menu ? (menu.children ? menu.children.length > 0 : false) : false;
  }

  /**
   * 判断指定路径是否激活
   *
   * @param url 路径
   */
  isActive(url: string): boolean {
    if (!url) {
      return false;
    }
    return this.router.isActive(url, false);
  }

  /**
   * 判断菜单是否需要展开
   *
   * @param menu
   */
  isOpen(menu: SidebarMenuInfo): boolean {
    if (!this.hasChildren(menu)) {
      return false;
    }
    return this.checkChildrenActive(menu.children, false);
  }

  /**
   * 检查下级菜单有没有激活状态
   *
   * @param submenus 下级菜单
   * @param flag 激活状态
   */
  checkChildrenActive(submenus: SidebarMenuInfo[], flag: boolean): boolean {
    for (const submenu of submenus) {
      // 没有子节点，url为真，路由状态为激活
      if (submenu && !this.hasChildren(submenu) && submenu.url && this.isActive(submenu.url)) {
        flag = true;
        break;
      } else if (this.hasChildren(submenu)) {
        this.checkChildrenActive(submenu.children, flag);
      }
    }
    return flag;
  }


}
