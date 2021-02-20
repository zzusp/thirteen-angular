/**
 * tree-table数据对象实体类
 */
export class TreeTableDataModel {
  datas: TreeTableRowModel[];

  constructor(datas: any[]) {
    const defaultItem: TreeTableRowModel = {
      selectAble: true,
      checkAble: true,
      selected: false,
      checked: false,
      leaf: false
    };
    this.datas = datas.map((item: any) => {
      if (item.children) {
        item.children = new TreeTableDataModel(item.children).datas;
      }
      return {...defaultItem, ...item};
    });
  }
}

/**
 * tree-table行对象接口
 */
export interface TreeTableRowModel {
  /** 是否可选中行 */
  selectAble?: boolean;
  /** 是否可勾选 */
  checkAble?: boolean;
  /** 是否选中 */
  selected?: boolean;
  /** 是否勾选 */
  checked?: boolean;
  /** 是否展开 */
  open?: boolean;
  /** 是否叶节点 */
  leaf?: boolean;
  /** 子节点 */
  children?: TreeTableRowModel[];
}
