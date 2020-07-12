import { BaseTreeSortModel } from '../model/base-tree-sort.model';
import { GlobalConstants } from '../constant/GlobalConstants';
import { NzTreeNodeOptions } from 'ng-zorro-antd';

/**
 * tree-table节点
 */
export interface TreeNode extends NzTreeNodeOptions {
  /** 层级 */
  level: number;
}

/**
 * list转Tree
 *
 * @param list
 * @param deep 默认展开深度 深度等于层级时该层级展开
 * @param parentCode 上级编码
 * @param level 层级
 */
export function listToTree(list: BaseTreeSortModel[], deep = -1,
                           parentCode = GlobalConstants.getInstance().ROOT_PARENT_CODE, level = 0): TreeNode[] {
  const result: TreeNode[] = [];
  const levelTemp: number = level;
  list.forEach((obj, index) => {
    if (parentCode === obj.parentCode) {
      const model: TreeNode = {
        title: obj.name,
        key: obj.code,
        level: level
      };
      const children = listToTree(list, deep, obj.code, level++);
      if (children.length > 0) {
        model.expanded = deep >= levelTemp;
        model.children = children;
      } else {
        model.isLeaf = true;
      }
      list.slice(index, 1);
      result.push(model);
    }
  });
  return result;
}

/**
 * list转BaseTree
 *
 * @param list
 * @param parentCode
 */
export function listToBaseTree(list: BaseTreeSortModel[],
                               parentCode = GlobalConstants.getInstance().ROOT_PARENT_CODE): BaseTreeSortModel[] {
  const result: BaseTreeSortModel[] = [];
  list.forEach((obj, index) => {
    if (parentCode === obj.parentCode) {
      const model = Object.assign({}, obj);
      list.slice(index, 1);
      model.children = listToBaseTree(list, model.code);
      result.push(model);
    }
  });
  return result;
}
