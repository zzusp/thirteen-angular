import {
  AfterViewInit,
  Component,
  EmbeddedViewRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TreeTableRowModel } from '../models/tree-table-data.model';
import { TreeTableService } from '../services/tree-table.service';
import { TreeTableConfigModel } from '../models/tree-table-config.model';
import { TreeTableColumnModel } from '../models/tree-table-columns.model';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tree-table-column-template',
  template: `
    <label *ngIf="isFirst">
      <!-- 缩进 -->
      <ng-container #indents></ng-container>
      <span *ngIf="treeTable.hasChildren(rowData) || 
            (treeTable.isLazy(config) && !treeTable.isLeaf(rowData))"
            [class]="treeTable.getConfigIcon(config, rowData)"
            class="tree-table-row-icon"
            (click)="rowOpen($event)"></span>
    </label>
    <!-- 判断模板是否有内容，如果有显示模板内容 -->
    <span *ngIf="!treeTable.hasTemplate(column)"
          [innerHtml]="safeHtml"></span>
    <ng-container #container></ng-container>
    <ng-template #indent>
      <span class="tree-table-row-indent"></span>
    </ng-template>`,
  styleUrls: ['../tree-table.component.scss']
})
export class TreeTableColumnComponent implements OnInit, AfterViewInit, OnDestroy {
  /** tree-table配置 */
  @Input() config: TreeTableConfigModel;
  /**
   * 列对象
   */
  @Input() column: TreeTableColumnModel;
  /**
   * 层级
   */
  @Input() level: number;
  /**
   * 是否为第一列
   */
  @Input() isFirst: boolean;
  /**
   * 行数据
   */
  @Input() rowData: TreeTableRowModel;
  /**
   * 添加模板的目标位置
   */
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  /**
   * 添加缩进的目标位置
   */
  @ViewChild('indents', {read: ViewContainerRef}) indents: ViewContainerRef;
  /**
   * 缩进
   */
  @ViewChild('indent', {read: TemplateRef}) indent: TemplateRef<any>;
  /**
   * 安全的html内容
   */
  safeHtml: SafeHtml;
  view: EmbeddedViewRef<any>;

  constructor(public treeTable: TreeTableService) {
  }

  ngOnInit() {
    if (this.column.template) {
      // 设置模板 $implicit let 模板语法，允许在生成上下文时定义和传递上下文 类似let-row=this.rowData
      this.view = this.container.createEmbeddedView(this.column.template, {
        '\$implicit': this.rowData
      });
    } else if (this.column.key && typeof this.treeTable.getData(this.rowData, this.column.key) !== 'undefined') {
      // 设置html内容
      this.safeHtml = this.treeTable.sanitize(this.treeTable.getData(this.rowData, this.column.key));
    }
  }

  ngAfterViewInit(): void {
    // 设置缩进
    if (this.treeTable.hasChildren(this.rowData)
      || (this.treeTable.isLazy(this.config) && !this.treeTable.isLeaf(this.rowData))) {
      this.addIndent(this.level);
    } else {
      this.addIndent(this.level + 1);
    }
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }

  @HostListener('click', ['$event'])
  toggleShow($event: any) {
    if (this.column.template) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  /**
   * 添加缩进
   *
   * @param size 缩进数
   */
  addIndent(size) {
    if (this.indents) {
      for (let i = 0; i < size; i++) {
        this.indents.createEmbeddedView(this.indent);
      }
    }
  }

  /**
   * 节点展开
   *
   * @param $event
   */
  rowOpen($event: any): void {
    $event.preventDefault();
    // 阻止事件冒泡
    $event.stopPropagation();
    this.rowData.open = !this.rowData.open;
    if (this.rowData.open) {
      // 调用配置中的展开监听方法
      this.config.onExpanded(this.rowData);
    } else {
      // 调用配置中的折叠监听方法
      this.config.onCollapsed(this.rowData);
    }
  }

}
