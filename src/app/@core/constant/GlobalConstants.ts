/** 全局常量  */
export class GlobalConstants {
  /** 懒汉模式 */
  // private static instance: GlobalConstants;
  /** 饿汉模式 */
  private static instance: GlobalConstants = new GlobalConstants();

  TOKEN = 'token';
  CURRENT_USER = 'current_user';

  /** 鉴权中心接口服务器地址 */
  AUTHORIZATION_SERVER = '/api-authorization';
  /** 数据化平台接口服务器地址 */
  DM_SERVER = '/api-dm';
  AUTHORIZATION_SERVER_CODE = 'system';

  /** 租赁管理系统接口服务器地址 */
  RENTAL_SERVER = '/api-rental';
  RENTAL_SERVER_CODE = 'rental';

  /** 删除标记（0：正常；1：删除） */
  DEL_FLAG_NORMAL = '0';
  DEL_FLAG_DELETE = '1';
  /** 是否启用（0：禁用；1：启用） */
  ACTIVE_OFF = '0';
  ACTIVE_ON = '1';
  /** 根节点父节点ID */
  ROOT_PARENT_CODE = 'root';
  /** 新增操作标识 */
  INSERT_FLAG = '0';
  /** 应用类型（0：微服务应用；1：应用接口；2：应用菜单；3：应用菜单组） */
  APPLICATION_SERVICE = '0';
  APPLICATION_INTERFACE = '1';
  APPLICATION_MENU = '2';
  APPLICATION_HEADING = '3';
  /**
   * 权限类型（0：需登录；1：需认证；2：需授权）
   * 注：授权需登陆
   */
  PERMISSION_LOGIN = '0';
  PERMISSION_AUTHOR = '1';
  PERMISSION_PERMS = '2';
  /** 业务类型编码-性别编码 */
  BIZ_TYPE_GENDER = 'gender';

  /** 提示信息 */
  DELETE_CONFIRM_MSG = '您正在进行删除操作，是否确定删除该记录？';
  DELETE_CANTER_MSG = '已取消删除操作';
  DELETE_SUCESS_MSG = '删除成功';
  DELETE_LOADING_MSG = '删除中，请稍后';

  private constructor() {
  }

  /**
   * 获取当前实例
   *
   * @static
   * @returns {Global}
   */
  public static getInstance(): GlobalConstants {
    // 懒汉模式
    // if (!GlobalConstants.instance) {
    //   GlobalConstants.instance = new GlobalConstants();
    // }
    // return this.instance;
    // 饿汉模式
    return GlobalConstants.instance;
  }

}
