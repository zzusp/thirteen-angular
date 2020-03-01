import { Injectable } from '@angular/core';
import { LayoutConfig } from './interface/layout-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutData } from './interface/layout-data';

/**
 * 布局相关的服务
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  /**
   * 布局配置
   */
  private layoutConfig: LayoutConfig = {
    collapsed: false,
    userBlockVisible: true
  };
  /**
   * 布局数据
   */
  private layoutData: LayoutData = {
    userBlock: {
      name: 'John',
      role: 'Designer',
      photo: 'assets/img/user/02.jpg'
    }
  };
  /**
   * 全局加载动画显示标识
   */
  loading: boolean = false;
  /**
   * 通过BehaviorSubject设置/获取最新配置，类似广播
   */
  protected configControl = new BehaviorSubject(this.layoutConfig);
  /**
   * 通过BehaviorSubject设置/获取最新数据，类似广播
   */
  protected dataControl = new BehaviorSubject(this.layoutData);
  /**
   * 通过BehaviorSubject设置/获取最新数据，类似广播
   */
  protected loadControl = new BehaviorSubject(this.loading);

  constructor() {
  }

  /**
   * 获取布局配置
   */
  getLayoutConfig(): Observable<LayoutConfig> {
    return this.configControl.asObservable();
  }

  /**
   * 设置布局配置
   *
   * @param layoutConfig
   */
  setLayoutConfig(layoutConfig: LayoutConfig): void {
    this.configControl.next(layoutConfig);
  }

  /**
   * 获取布局数据
   */
  getLayoutData(): Observable<LayoutData> {
    return this.dataControl.asObservable();
  }

  /**
   * 设置布局数据
   *
   * @param layoutData
   */
  setLayoutData(layoutData: LayoutData): void {
    this.dataControl.next(layoutData);
  }

  /**
   * 显示加载动画
   */
  loadStart(): void {
    this.loadControl.next(true);
  }

  /**
   * 隐藏加载动画
   */
  loadEnd(): void {
    this.loadControl.next(false);
  }

  /**
   * 获取全局动画当前状态
   */
  getLoading(): Observable<boolean> {
    return this.loadControl.asObservable();
  }

}
