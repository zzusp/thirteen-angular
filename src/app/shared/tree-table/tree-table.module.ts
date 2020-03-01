import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeTableComponent } from './tree-table.component';
import { TreeTableService } from './services/tree-table.service';
import { TreeTableRowComponent } from './components/tree-table-row.component';
import { TreeTableColumnComponent } from './components/tree-table-column.component';

// TREETBALE模块
const TREETBALE_MODULES = [];

// TREETBALE组件
const TREETBALE_COMPONENTS = [
  TreeTableComponent,
  TreeTableRowComponent,
  TreeTableColumnComponent
];

// TREETBALE指令
const TREETBALE_DIRECTIVE = [];

// TREETBALE服务
const TREETBALE_PROVIDERS = [
  TreeTableService
];

@NgModule({
  imports: [
    CommonModule,
    ...TREETBALE_MODULES
  ],
  exports: [
    ...TREETBALE_COMPONENTS,
    ...TREETBALE_DIRECTIVE
  ],
  declarations: [
    ...TREETBALE_COMPONENTS,
    ...TREETBALE_DIRECTIVE
  ],
  providers: [
    ...TREETBALE_PROVIDERS
  ]
})
export class TreeTableModule {
}
