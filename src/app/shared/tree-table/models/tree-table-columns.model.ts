import { TemplateRef } from '@angular/core';

/**
 * tree-table单元格的实体类
 */
export interface TreeTableColumnModel {
  /**
   * 标题
   */
  title: string;
  /**
   * 标识
   */
  key?: string;
  /**
   * 自定义宽度
   */
  width?: string;
  /**
   * 自定义模板
   */
  template?: TemplateRef<any>;
}
