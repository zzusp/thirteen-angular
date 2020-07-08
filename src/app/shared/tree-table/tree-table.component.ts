import { Component, Input, OnInit } from '@angular/core';
import { TreeTableConfigModel } from './models/tree-table-config.model';
import { TreeTableColumnModel } from './models/tree-table-columns.model';
import { TreeTableDataModel } from './models/tree-table-data.model';
import { TreeTableService } from './services/tree-table.service';

@Component({
  selector: 'app-tree-table',
  template: `
    <table class="table table-bordered tree-table">
      <thead class="tree-table-thead">
      <tr>
        <th *ngIf="treeTable.checkableAll(config)" class="checkbox-column">
          <div class="tree-table-checkbox">
            <label>
              <input type="checkbox" [checked]="checked">
              <span class="fa fa-fw"
                    [class]="isAllChildrenChecked() ? 'fa-check' : 'fa-minus'"
                    (click)="checkedChange($event)"></span>
            </label>
          </div>
        </th>
        <th *ngFor="let column of columns; let i = index; let last = last;">
          {{column.title}}
        </th>
      </tr>
      </thead>
      <tbody class="tree-table-tbody">
      <ng-container *ngIf="!!data && !!data.datas">
        <app-tree-table-row
          [config]="config"
          [columns]="columns"
          *ngFor="let row of data.datas; let i = index; let last = last;"
          [row]="row"
          [index]="i"
          [parentIndex]="0"
          [level]="0"
          (checkedState)="subCheckedChange($event)"
          [isLast]="last"
          (ngforFinish)="lazyRender($event)">
        </app-tree-table-row>
      </ng-container>
      </tbody>
    </table>
    <ng-container *ngIf="(!data || !data.datas) && loading === false">
      <div class="tree-table-placeholder">暂无数据</div>
    </ng-container>
  `,
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {

  @Input() config: TreeTableConfigModel;
  @Input() columns: TreeTableColumnModel[];
  @Input() data: TreeTableDataModel;
  @Input() loading: boolean;

  checked: boolean;

  constructor(public treeTable: TreeTableService) {
  }

  ngOnInit() {
  }

  /**
   * 下级树勾选事件监听
   *
   * @param $event
   */
  subCheckedChange($event: boolean): void {
    this.checked = !this.isAllChildrenUnChecked();
  }

  /**
   * 懒加载下级节点渲染完成事件
   *
   * @param $event
   */
  lazyRender($event: boolean): void {
    setTimeout(() => {
      if (this.config.lazy && $event) {
        this.config.onLazyRender(null, $event);
      }
      this.checked = !this.isAllChildrenUnChecked();
    });
  }

  /**
   * 所有下级是否全部未勾选
   */
  isAllChildrenUnChecked(): boolean {
    let isAllUnChecked = true;
    for (const row of this.data.datas) {
      isAllUnChecked = this.treeTable.isAllChildrenUnChecked(row);
      if (!isAllUnChecked) {
        break;
      }
    }
    return isAllUnChecked;
  }

  /**
   * 所有下级是否全部未勾选
   */
  isAllChildrenChecked(): boolean {
    let isAllChecked = true;
    for (const row of this.data.datas) {
      isAllChecked = this.treeTable.isAllChildrenChecked(row);
      if (!isAllChecked) {
        break;
      }
    }
    return isAllChecked;
  }

  /**
   * 勾选监听
   *
   * @param $event
   */
  checkedChange($event: any): void {
    $event.preventDefault();
    // 阻止事件冒泡
    $event.stopPropagation();
    if (this.isAllChildrenChecked() || !this.checked) {
      this.checked = !this.checked;
    }
    for (const row of this.data.datas) {
      this.treeTable.checkAllChildren(row, this.checked);
      //  触发所有的子节点勾选回调函数
      this.config.onCheckChange(row, this.checked);
    }
  }
}
