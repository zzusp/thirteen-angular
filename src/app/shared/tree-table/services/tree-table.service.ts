import { Injectable } from '@angular/core';
import { TreeTableConfigModel } from '../models/tree-table-config.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TreeTableDataModel, TreeTableRowModel } from '../models/tree-table-data.model';
import { TreeTableColumnModel } from '../models/tree-table-columns.model';
import { Subject } from 'rxjs';

@Injectable()
export class TreeTableService {

  private _selectedRow: TreeTableRowModel;
  private _selectedData: any;
  private _checkedRows: TreeTableRowModel[] = [];
  private _checkedDatas: any[] = [];

  // 选中事件广播通知
  selectEvent: Subject<any> = new Subject<any>();

  // 检查是否可选中，默认true
  selectableAll(config: TreeTableConfigModel): boolean {
    return config.selectAble;
  }

  // 检查是否可勾选,默认false
  checkableAll(config: TreeTableConfigModel): boolean {
    return config.checkAble;
  }

  getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  // 检查是否有子节点，且子节点大小大于0
  hasChildren(row: TreeTableRowModel): boolean {
    return row.children ? row.children.length > 0 : false;
  }

  // 是否为懒加载模式
  isLazy(config: TreeTableConfigModel): boolean {
    return config.lazy;
  }

  // 检查该节点是否为叶节点，与懒加载模式结合使用
  isLeaf(row: TreeTableRowModel): boolean {
    return row.leaf;
  }

  // 检查该节点是否为展开状态
  isOpen(row: TreeTableRowModel): boolean {
    return row.open;
  }

  // 检查是否选中
  isSelected(row: TreeTableRowModel): boolean {
    return row.selected;
  }

  // 检查是否勾选
  isChecked(row: TreeTableRowModel): boolean {
    return !!row.checked;
  }

  // 检查是否可单选
  selectAble(row: TreeTableRowModel): boolean {
    return row.selectAble;
  }

  // 检查是否可多选
  checkAble(row: TreeTableRowModel): boolean {
    return !!row.checkAble;
  }

  // 检查是否有需要模板显示的列
  hasTemplate(column: TreeTableColumnModel): boolean {
    return !!column.template;
  }

  // 获取折叠展开的图标
  getConfigIcon(config: TreeTableConfigModel, row: TreeTableRowModel): string {
    if (this.isOpen(row)) {
      return config.iconOpen;
    }
    return config.iconClose;
  }

  // 对html代码进行安全过滤
  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // 通过判断下级节点是否全部勾选设置图标
  getCheckedIcon(row: TreeTableRowModel): string {
    if (this.hasChildren(row) && !this.isAllChildrenUnChecked(row)) {
      return this.isAllChildrenChecked(row) ? 'fa-check' : 'fa-minus';
    }
    return this.isChecked(row) ? 'fa-check' : '';
  }

  // 所有下级是否全部勾选
  isAllChildrenChecked(row: TreeTableRowModel): boolean {
    let isAllChecked = true;
    if (!this.hasChildren(row)) {
      return this.checkAble(row) ? row.checked : true;
    }
    for (const subtree of row.children) {
      if (this.checkAble(subtree) && !this.isChecked(subtree)) {
        isAllChecked = false;
        break;
      }
      if (!this.isAllChildrenChecked(subtree)) {
        isAllChecked = false;
        break;
      }
    }
    return isAllChecked;
  }

  // 所有下级是否全部未勾选
  isAllChildrenUnChecked(row: TreeTableRowModel): boolean {
    let isAllUnChecked = true;
    if (!this.hasChildren(row)) {
      return this.checkAble(row) ? !row.checked : true;
    }
    for (const subtree of row.children) {
      if (this.checkAble(subtree) && this.isChecked(subtree)) {
        isAllUnChecked = false;
        break;
      }
      if (!this.isAllChildrenUnChecked(subtree)) {
        isAllUnChecked = false;
        break;
      }
    }
    return isAllUnChecked;
  }

  // 级联勾选下级所有节点
  checkAllChildren(row: TreeTableRowModel, state: boolean): void {
    if (!this.hasChildren(row)) {
      row.checked = state;
      return;
    }
    for (const subtree of row.children) {
      subtree.checked = state;
      this.checkAllChildren(subtree, state);
    }
  }

  // 级联勾选下级所有节点
  checkChildren(row: TreeTableRowModel, state: boolean): void {
    if (!this.hasChildren(row)) {
      row.checked = state;
      return;
    }
    for (const subtree of row.children) {
      subtree.checked = state;
    }
  }

  // 递归遍历所有节点数据
  recursiveTreeData(rows: TreeTableRowModel[], type: string, key?: string) {
    for (const subrow of rows) {
      if (type === 'select' && this.isSelected(subrow) && this.selectAble(subrow)) {
        this._selectedRow = subrow;
        this._selectedData = subrow[key];
      }
      if (type === 'check' && this.isChecked(subrow) && this.checkAble(subrow)) {
        this._checkedRows.push(subrow);
        this._checkedDatas.push(subrow[key]);
      }
      if (this.hasChildren(subrow)) {
        this.recursiveTreeData(subrow.children, type, key);
      }
    }
  }

  // 获取选中节点
  getSelectedRow(data: TreeTableDataModel): TreeTableRowModel {
    this._selectedRow = {};
    this.recursiveTreeData(data.datas, 'select');
    return this._selectedRow;
  }

  // 获取选中节点的数据
  getSelectedData(data: TreeTableDataModel, key: string): any {
    this._selectedData = '';
    this.recursiveTreeData(data.datas, 'select', key);
    return this._selectedData;
  }

  // 获取已勾选节点
  getCheckedRows(data: TreeTableDataModel): TreeTableRowModel[] {
    this._checkedRows.splice(0, this._checkedRows.length);
    this.recursiveTreeData(data.datas, 'check');
    return this._checkedRows;
  }

  // 获取选中节点
  getCheckedData(data: TreeTableDataModel, key: string): any[] {
    this._checkedDatas.splice(0, this._checkedDatas.length);
    this.recursiveTreeData(data.datas, 'check', key);
    return this._checkedDatas;
  }

  constructor(private sanitizer: DomSanitizer) {

  }

}
