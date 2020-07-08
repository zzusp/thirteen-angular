import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { TreeTableRowModel } from '../models/tree-table-data.model';
import { TreeTableConfigModel } from '../models/tree-table-config.model';
import { TreeTableService } from '../services/tree-table.service';
import { TreeTableColumnModel } from '../models/tree-table-columns.model';

@Component({
  selector: 'app-tree-table-row, [app-tree-table-row]',
  template: `
    <tr #rowElement [class]="{'active':  treeTable.selectableAll(config) 
          && treeTable.selectable(row)
           && treeTable.isSelected(row)}"
        (click)="rowSelectedChange($event)">
      <td *ngIf="treeTable.checkableAll(config)"
          class="checkbox-column"
          (click)="rowCheckedChange($event)">
        <div class="tree-table-checkbox">
          <label>
            <input type="checkbox"
                   [checked]="treeTable.isChecked(row) && treeTable.checkable(row)"
                   [disabled]="!treeTable.checkable(row)">
            <span class="tree-table-row-icon"
                  [class]="treeTable.getCheckedIcon(row, config)"></span>
          </label>
        </div>
      </td>
      <td *ngFor="let column of columns; index as i; first as isFirst;" class="tree-column" [style.width]="column.width">
        <app-tree-table-column-template
          [config]="config"
          [column]="column"
          [level]="level"
          [isFirst]="isFirst"
          [rowData]="row">
        </app-tree-table-column-template>
      </td>
    </tr>
    <ng-container *ngIf="treeTable.hasChildren(row) && treeTable.isOpen(row)">
      <app-tree-table-row
        [config]="config"
        [columns]="columns"
        *ngFor="let row of row.children; let i = index; let last = last;"
        [row]="row"
        [index]="i"
        [parentIndex]="index"
        [level]="level + 1"
        (checkedState)="subCheckedChange($event)"
        [isLast]="last"
        (ngforFinish)="lazyRender($event)">
      </app-tree-table-row>
    </ng-container>
  `,
  styleUrls: ['../tree-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeTableRowComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {

  @Input() config: TreeTableConfigModel;
  @Input() columns: TreeTableColumnModel[];
  @Input() row: TreeTableRowModel;
  @Input() index: number;
  @Input() parentIndex: number;
  @Input() level: number;
  @Output() checkedState = new EventEmitter<boolean>();

  // ngFor完成事件回调相关参数
  @Input() isLast: boolean;
  @Output() lastDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('rowElement') rowElement: ElementRef;

  private differ: KeyValueDiffer<string, any>;

  constructor(public treeTable: TreeTableService,
              private el: ElementRef,
              private differs: KeyValueDiffers) {
  }

  /*
  * 注：angular中不推荐去除自定义标签，暂无第二种解决方案替代
  * */

  /**
   * wait for the component to render completely
   */
  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

    if (this.row) {
      this.differ = this.differs.find(this.row).create();
    }

    // 接收广播，取消其他选中
    this.treeTable.selectEvent.subscribe((value) => {
      const flag = this.index !== value.index
        || this.parentIndex !== value.parentIndex
        || this.level !== value.level;
      if (flag) {
        this.row.selected = false;
      }
    });
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.row);
    if (changes) {
      this.applyKeyValueChanges(changes);
    }
  }

  ngAfterViewInit(): void {
    /**
     * 初始化
     */
    setTimeout(() => {
      // 初始化展开状态
      if (this.config.lazy) {
        this.row.open = false;
      } else {
        // 由默认展开层级设置展开状态
        if (typeof this.row.open === 'undefined') {
          this.row.open = this.config.level >= 0 ? this.config.level > this.level : true;
        }
      }
      // 如果是ngFor遍历到最后一个节点时，回调
      if (this.isLast) {
        this.lastDone.emit(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.rowElement) {
      this.rowElement.nativeElement.parentElement.removeChild(this.rowElement.nativeElement);
    }
  }

  /**
   * 选中行
   *
   * @param $event
   */
  rowSelectedChange($event: any): void {
    $event.preventDefault();
    // 阻止事件冒泡
    $event.stopPropagation();
    if (!this.treeTable.selectable(this.row) ||
      !this.treeTable.selectableAll(this.config)) {
      return;
    }
    this.row.selected = !this.row.selected;
    // 发送广播取消其他选中
    this.treeTable.selectEvent.next({index: this.index, parentIndex: this.parentIndex, level: this.level});
    // 调用配置中的选中监听方法
    this.config.onSelectChange(this.row);
  }

  /**
   * 勾选行
   *
   * @param $event
   */
  rowCheckedChange($event: any) {
    $event.preventDefault();
    // 阻止事件冒泡
    $event.stopPropagation();
    if (!this.treeTable.checkable(this.row) ||
      !this.treeTable.checkableAll(this.config)) {
      return;
    }
    // 判断是否所有子节点都已勾选或未勾选
    if (this.treeTable.isAllChildrenChecked(this.row) || !this.row.checked) {
      this.row.checked = !this.row.checked;
    }
    this.treeTable.checkAllChildren(this.row, this.row.checked);
    // 调用配置中的勾选监听方法
    this.config.onCheckChange(this.row);
  }

  /**
   * 下级树勾选事件监听
   *
   * @param $event
   */
  subCheckedChange($event: boolean): void {
    this.row.checked = !this.treeTable.isAllChildrenUnChecked(this.row);
  }

  /**
   * json对象变化监听
   *
   * @param changes
   */
  private applyKeyValueChanges(changes: KeyValueChanges<string, any>): void {
    changes.forEachChangedItem((record) => {
      if (record.previousValue !== record.currentValue) {
        this.toggleValue(record.key, record.currentValue);
      }
    });
  }

  private toggleValue(key: string, value: any): void {
    if (key === 'checked') {
      setTimeout(() => {
        this.checkedState.emit(this.row.checked);
      });
    }
  }

  /**
   * 懒加载下级节点渲染完成事件
   *
   * @param $event
   */
  lazyRender($event: boolean): void {
    if (this.config.lazy) {
      this.config.onLazyRender(this.row, $event);
    }
  }

}
