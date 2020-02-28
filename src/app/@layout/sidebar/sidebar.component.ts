import { Component, Input, OnInit } from '@angular/core';
import { LayoutConfig } from '../interface/layout-config';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {LayoutData, SidebarMenuInfo} from '../interface/layout-data';
import { SidebarService } from './sidebar.service';
import {GlobalConstants} from '../../@core/constant/GlobalConstants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('userBlockState', [
      state('show', style({
        opacity: '1.0'
      })),
      state('hidden',   style({
        opacity: '0.0',
        height: '0',
        padding: '0'
      })),
      transition('show => hidden', animate('150ms ease-in')),
      transition('hidden => show', animate('150ms ease-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  /**
   * 全局常量
   */
  global: GlobalConstants = GlobalConstants.getInstance();
  /**
   * 布局配置
   */
  @Input() config: LayoutConfig;
  /**
   * 布局数据
   */
  @Input() data: LayoutData;

  constructor(protected sidebarService: SidebarService) { }

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
      return this.global.APP_PREFIX + menu.url;
    } else {
      return '/pages/500';
    }
  }

}
