// 布局数据
import { ApplicationModel } from '../../routes/application/application.model';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

export interface LayoutData {
  /** 用户信息 */
  userBlock?: UserBlockInfo;
  /** 左侧菜单信息 */
  sidebarMenu?: SidebarMenuInfo[];
}

// 用户信息块
export interface UserBlockInfo {
  /** 头像路径 */
  photo: string;
  /** 用户名 */
  name: string;
  /** 角色 */
  role: string;
}

// 左侧菜单信息
export interface SidebarMenuInfo {
  /** 菜单名称 */
  name: string;
  /** 菜单图标 */
  icon?: string;
  /** 路径 */
  url?: string;
  /** 是否为菜单组 */
  group?: boolean;
  /** 二级菜单 */
  children?: SidebarMenuInfo[];
}

/**
 * application list to sidebarMenu
 *
 * @param list
 * @param pCode
 */
export function applicationToSidebar(list: ApplicationModel[], pCode: string): SidebarMenuInfo[] {
  const result: SidebarMenuInfo[] = [];
  if (!!list) {
    const temp = [...list];
    temp.forEach((obj, index) => {
      if (pCode === obj.pCode) {
        const model: SidebarMenuInfo = {
          name: obj.name,
          icon: obj.icon,
          url: obj.url,
          group: GlobalConstants.getInstance().APPLICATION_HEADING === obj.type
        };
        model.children = applicationToSidebar(temp, obj.code);
        result.push(model);
      }
    });
  }
  return result;
}
