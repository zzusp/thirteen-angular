import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, NZ_ICONS, zh_CN } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { DefaultInterceptor } from '../@core/net/default.interceptor';
import { TreeTableModule } from './tree-table/tree-table.module';
import zh from '@angular/common/locales/zh';
import { IconDefinition } from '@ant-design/icons-angular';
/** 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️ **/
import { AlertOutline } from '@ant-design/icons-angular/icons';
// import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [AlertOutline];
registerLocaleData(zh);

// 第三方模块
const THIRD_MODULES = [
  /** 导入 ng-zorro-antd 模块 **/
  NgZorroAntdModule,
  /** 导入 tree-table 模块 **/
  TreeTableModule
];

// 公共服务
const SHARED_PROVIDERS = [
  /** 配置 ng-zorro-antd 国际化 **/
  {provide: NZ_I18N, useValue: zh_CN},
  // { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
  /** 配置 ng-zorro-antd 图标 **/
  {provide: NZ_ICONS, useValue: icons}
];

// 公共指令
const SHARED_DORECTOVES = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    /** 导入第三方模块 **/
    ...THIRD_MODULES
  ],
  declarations: [
    ...SHARED_DORECTOVES
  ],
  providers: [
    /** 默认http拦截器 **/
    {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
    /** 公共服务 **/
    ...SHARED_PROVIDERS
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    /** third libs **/
    ...THIRD_MODULES,
    /** 公共指令 **/
    ...SHARED_DORECTOVES
  ]
})
export class SharedModule {
}
