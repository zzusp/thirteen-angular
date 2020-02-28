import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalDashboardComponent } from './rental-dashboard/rental-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RentalRoutingModule } from './rental-routing.module';
import { ReportStopComponent } from './report-stop/report-stop.component';
import { OutOrderComponent } from './out-order/out-order.component';
import { InOrderComponent } from './in-order/in-order.component';
import { ContractComponent } from './contract/contract.component';
import { SettlementComponent } from './settlement/settlement.component';
import { StockComponent } from './stock/stock.component';
import { LesseeComponent } from './lessee/lessee.component';
import { DataTypeComponent } from './data-type/data-type.component';
import { DataDictComponent } from './data-dict/data-dict.component';

// 建筑租赁管理系统下所有需动态加载的子组件（弹出框等）
const RENTAL_MODEL_COMPONENT = [];

// 建筑租赁管理系统下所有子组件
const RENTAL_COMPONENT = [
  RentalDashboardComponent,
  ReportStopComponent,
  OutOrderComponent,
  InOrderComponent,
  ContractComponent,
  SettlementComponent,
  StockComponent,
  LesseeComponent,
  DataTypeComponent,
  DataDictComponent
];

@NgModule({
  imports: [
    CommonModule,
    /** 导入共享模块 **/
    SharedModule,
    /** 导入路由配置模块 **/
    RentalRoutingModule
  ],
  declarations: [
    ...RENTAL_COMPONENT
  ],
  entryComponents: [
    ...RENTAL_MODEL_COMPONENT
  ]
})
export class RentalModule { }
