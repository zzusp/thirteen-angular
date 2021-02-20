import { TreeTableRowModel } from './tree-table-data.model';

/**
 * tree-table的配置实体类
 */
export class TreeTableConfigModel {
  /** 是否可选中行 */
  selectAble: boolean;
  /** 是否可勾选 */
  checkAble: boolean;
  /** 展开层级，默认为0 */
  level: number;
  /** 展开时的图标 */
  iconOpen: string;
  /** 折叠时的图标 */
  iconClose: string;
  /** 自定义样式 */
  styleClass: string;
  /** 是否为懒加载 */
  lazy: boolean;
  /** 选中行时的回调函数 */
  onSelectChange: TreeTableActionCallback;
  /** 勾选时的回调函数 */
  onCheckChange: TreeTableActionCallback;
  /** 折叠时的回调函数 */
  onCollapsed: TreeTableActionCallback;
  /** 展开时的回调函数 */
  onExpanded: TreeTableActionCallback;
  /** 懒加载时的回调函数 */
  onLazyRender: TreeTableActionCallback;

  constructor(fields?: {
    selectAble?: boolean;
    checkAble?: boolean;
    level?: number;
    iconOpen?: string;
    iconClose?: string;
    styleClass?: string;
    lazy?: boolean;
    childrenKey?: string;
    onSelectChange?: TreeTableActionCallback;
    onCheckChange?: TreeTableActionCallback;
    onCollapsed?: TreeTableActionCallback;
    onExpanded?: TreeTableActionCallback;
    onLazyRender?: TreeTableActionCallback;
  }) {
    const defaultConfig = {
      selectAble: false,
      checkAble: false,
      level: 0,
      iconOpen: 'icon-expand',
      iconClose: 'icon-collapse',
      styleClass: '',
      lazy: false,
      onSelectChange: () => {
      },
      onCheckChange: () => {
      },
      onCollapsed: () => {
      },
      onExpanded: () => {
      },
      onLazyRender: () => {
      }
    }, realConfig = {...defaultConfig, ...fields};
    this.selectAble = realConfig.selectAble;
    this.checkAble = realConfig.checkAble;
    this.level = realConfig.level;
    this.iconOpen = realConfig.iconOpen;
    this.iconClose = realConfig.iconClose;
    this.styleClass = realConfig.styleClass;
    this.lazy = realConfig.lazy;
    this.onSelectChange = realConfig.onSelectChange;
    this.onCheckChange = realConfig.onCheckChange;
    this.onCollapsed = realConfig.onCollapsed;
    this.onExpanded = realConfig.onExpanded;
    this.onLazyRender = realConfig.onLazyRender;
  }
}

/**
 * 将方法作为属性类型
 */
export type TreeTableActionCallback = (treeTableItem: TreeTableRowModel, $event?: any) => void;
