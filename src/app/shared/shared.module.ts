import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, NZ_ICONS, zh_CN } from 'ng-zorro-antd';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { RouterModule } from '@angular/router';
import { DefaultInterceptor } from '../@core/net/default.interceptor';
import { TreeTableModule } from './tree-table/tree-table.module';
import zh from '@angular/common/locales/zh';
import { IconDefinition } from '@ant-design/icons-angular';
/** 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️ **/
import { AlertOutline } from '@ant-design/icons-angular/icons';

/**
 * This will import all modules from echarts.
 * If you only need custom modules,
 * please refer to [Custom Build] section.
 */
import { NgxEchartsModule } from 'ngx-echarts';
import 'echarts/theme/macarons.js';
import '../../assets/js/echarts/theme/walden.js';
// import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [AlertOutline];
registerLocaleData(zh);

// 第三方模块
const THIRD_MODULES = [
  /** 导入 ng-zorro-antd 模块 **/
  NzAlertModule,
  NzAvatarModule,
  NzBadgeModule,
  NzBreadCrumbModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMessageModule,
  NzModalModule,
  NzPopconfirmModule,
  NzRadioModule,
  NzSelectModule,
  NzSpinModule,
  NzTableModule,
  NzTimePickerModule,
  NzToolTipModule,
  NzTreeModule,
  NzTreeSelectModule,
  NzUploadModule,
  /** 导入 ngx-echarts 模块 **/
  NgxEchartsModule,
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
