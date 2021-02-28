/** 全局常量  */
export class GlobalConstants {
  /** 懒汉模式 */
  // private static instance: GlobalConstants;
  /** 饿汉模式 */
  private static instance: GlobalConstants = new GlobalConstants();

  TOKEN = 'token';
  CURRENT_USER = 'current_user';

  /** 数据化平台接口服务器地址 */
  DM_SERVER = '/api-dm';
  AUTHORIZATION_SERVER_CODE = 'rent';

  /** 租赁管理系统接口服务器地址 */
  RENTAL_SERVER = '/api-rental';
  RENTAL_SERVER_CODE = 'rent';

  /** 表名 */
  AUTH_USER = 'auth_user';
  AUTH_ROLE = 'auth_role';
  AUTH_PERMISSION = 'auth_permission';
  AUTH_GROUP = 'auth_group';
  AUTH_DEPT = 'auth_dept';
  AUTH_APP = 'auth_app';
  AUTH_USER_ROLE = 'auth_user_role';
  AUTH_DEPT_ROLE = 'auth_dept_role';
  AUTH_ROLE_PERMISSION = 'auth_role_permission';
  AUTH_ROLE_APP = 'auth_role_app';
  AUTH_BIZ_TYPE = 'auth_biz_type';
  AUTH_DICT = 'auth_dict';
  /** 租赁系统表名 */
  RENT_RENTER = 'rent_renter';
  RENT_CONTRACT = 'rent_contract';
  RENT_CONTRACT_CATEGORY = 'rent_contract_category';
  RENT_TRANSPORT = 'rent_transport';
  RENT_TRANSPORT_SPEC = 'rent_transport_spec';
  RENT_ITEM = 'rent_item';
  RENT_CATEGORY = 'rent_category';
  RENT_SPEC = 'rent_spec';
  RENT_BASE_INFO = 'rent_base_info';

  /** 是否启用（0：禁用；1：启用） */
  STATUS_OFF = 0;
  STATUS_ON = 1;
  /** 根节点父节点ID */
  ROOT_PARENT_CODE = 'root';
  /** 新增操作标识 */
  INSERT_FLAG = '0';
  /** 应用类型（0：微服务应用；1：应用接口；2：应用菜单；3：应用菜单组） */
  APPLICATION_SERVICE = 0;
  APPLICATION_INTERFACE = 1;
  APPLICATION_MENU = 2;
  APPLICATION_HEADING = 3;
  /**
   * 权限类型（0：需登录；1：需认证；2：需授权）
   * 注：授权需登陆
   */
  PERMISSION_LOGIN = 0;
  PERMISSION_AUTHOR = 1;
  PERMISSION_PERMS = 2;
  /** 业务类型编码-性别编码 */
  BIZ_TYPE_GENDER = 'gender';

  /** 提示信息 */
  DELETE_CONFIRM_MSG = '您正在进行删除操作，是否确定删除该记录？';
  DELETE_CANTER_MSG = '已取消删除操作';
  DELETE_SUCESS_MSG = '删除成功';
  DELETE_LOADING_MSG = '删除中，请稍后';

  /** 合同状态 0：租赁中；1：已结算； */
  CONTRACT_OPEN = 0;
  CONTRACT_CLOSE = 1;
  /** 运输单类型 0：出库；1：入库； */
  TRANSPORT_OUT = 0;
  TRANSPORT_IN = 1;
  /** 计算方式 0：算头又算尾；1：算头不算尾 */
  COMPUTE_MODE_ALL = 0;
  COMPUTE_MODE_START = 1;
  /** 计量单位 0：元/根；1：元/米；2：元/个；3：元/条 */
  UNIT_GEN = 0;
  UNIT_MI = 1;
  UNIT_GE = 2;
  UNIT_TIAO = 3;

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
