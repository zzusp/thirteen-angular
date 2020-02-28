import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RentalDashboardComponent } from './rental-dashboard/rental-dashboard.component';
import { ReportStopComponent } from './report-stop/report-stop.component';
import { OutOrderComponent } from './out-order/out-order.component';
import { InOrderComponent } from './in-order/in-order.component';
import { ContractComponent } from './contract/contract.component';
import { SettlementComponent } from './settlement/settlement.component';
import { StockComponent } from './stock/stock.component';
import { LesseeComponent } from './lessee/lessee.component';
import { DataTypeComponent } from './data-type/data-type.component';
import { DataDictComponent } from './data-dict/data-dict.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: RentalDashboardComponent
  },
  {
    path: 'report-stop',
    component: ReportStopComponent,
    data: {
      breadcrumb: '报停管理'
    }
  },
  {
    path: 'out-order',
    component: OutOrderComponent,
    data: {
      breadcrumb: '出库单管理'
    }
  },
  {
    path: 'in-order',
    component: InOrderComponent,
    data: {
      breadcrumb: '入库单管理'
    }
  },
  {
    path: 'contract',
    component: ContractComponent,
    data: {
      breadcrumb: '合同管理'
    }
  },
  {
    path: 'settlement',
    component: SettlementComponent,
    data: {
      breadcrumb: '结算管理'
    }
  },
  {
    path: 'stock',
    component: StockComponent,
    data: {
      breadcrumb: '库存管理'
    }
  },
  {
    path: 'lessee',
    component: LesseeComponent,
    data: {
      breadcrumb: '承租方管理'
    }
  },
  {
    path: 'data-type',
    component: DataTypeComponent,
    data: {
      breadcrumb: '数据类别'
    }
  },
  {
    path: 'data-dict',
    component: DataDictComponent,
    data: {
      breadcrumb: '数据字典'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RentalRoutingModule { }
