import { NgModule } from '@angular/core';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';

// layout 组件
const LAYOUT_COMPONENT = [
  LayoutDefaultComponent,
  LayoutNavComponent,
  HeaderComponent,
  SidebarComponent,
  SidebarMenuComponent,
  FooterComponent
];

@NgModule({
  imports: [
    /** 导入共享模块 **/
    SharedModule
  ],
  declarations: [
    ...LAYOUT_COMPONENT
  ]
})
export class LayoutModule {
}
