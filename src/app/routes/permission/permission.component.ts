import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
import { PermissionModel } from './permission.model';
import { PermissionService } from './permission.service';
import { NzFormatEmitEvent, NzMessageService, NzModalRef, NzModalService, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { PagerResultModel } from '../../@core/net/pager-result.model';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { validatePerms } from '../../@core/util/perms-validators';
import { ApplicationService } from '../application/application.service';
import { listToTree, TreeNode } from '../../@core/util/tree-node';
import { getSorts } from '../../@core/util/table-sort';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 应用树 */
  @ViewChild('applicationTree') applicationTree: NzTreeComponent;
  /** 选中的应用节点 */
  statusdNode: NzTreeNode;
  /** 应用树数据 */
  nodes: TreeNode[] = [];
  /** 查询参数  */
  params: any = {
    code: '',
    name: '',
    types: [],
    status: '',
    appCode: ''
  };
  /** 类型 */
  types: any[] = [];
  /** 是否启用  */
  statusArr: any[] = [];
  /** 当前页码  */
  pageNum: number = 1;
  /** 每页显示记录数  */
  pageSize: number = 10;
  /** 总记录数  */
  total: number = 0;
  /** 表格数据  */
  tableData: PermissionModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 应用树加载动画，默认关闭 */
  treeLoading = false;
  /** 排序  */
  sortMap = {
    code: 'asc',
    name: null,
    url: null,
    type: null,
    status: null,
    createTime: null,
    updateTime: null
  };
  /** 页面权限校验  */
  perms = {
    save: false,
    update: false,
    delete: false
  };

  constructor(private permissionService: PermissionService,
              private applicationSerivce: ApplicationService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.perms = {
      save: validatePerms(['permission:save']),
      update: validatePerms(['permission:update']),
      delete: validatePerms(['permission:delete'])
    };
    this.types = [
      {text: '需登录', value: this.global.PERMISSION_LOGIN},
      {text: '需认证', value: this.global.PERMISSION_AUTHOR},
      {text: '需授权', value: this.global.PERMISSION_PERMS}];
    this.statusArr = [
      {text: '启用', value: this.global.STATUS_ON},
      {text: '禁用', value: this.global.STATUS_OFF}];
    this.listTree();
    this.findAllByParam();
  }

  /**
   * 选中节点
   *
   * @param data
   */
  statusNode(data: NzFormatEmitEvent): void {
    if (this.statusdNode && this.statusdNode.key === data.node.key) {
      this.statusdNode = null;
      this.params.appCode = '';
    } else {
      this.statusdNode = data.node;
      this.params.appCode = this.statusdNode.key;
    }
    this.findAllByParam();
  }

  /**
   * 展开节点
   *
   * @param data
   * @param $event
   */
  openFolder(data: NzTreeNode | NzFormatEmitEvent, $event): void {
    $event.preventDefault();
    // 阻止事件冒泡
    $event.stopPropagation();
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      data.node.isExpanded = !data.node.isExpanded;
    }
  }

  listTree(): void {
    // 加载动画开启
    this.treeLoading = true;
    this.applicationSerivce.findAll().subscribe((res: ResponseResultModel) => {
      // 判断返回结果是否为空或null
      if (res && res.result) {
        const result: PagerResultModel = res.result;
        this.nodes = listToTree(result.list, 1);
      }
      // 加载动画关闭
      this.treeLoading = false;
    });
  }

  /**
   * 获取列表信息
   */
  findAllByParam(): void {
    // 加载动画开启
    this.loading = true;
    const param = {
      'criterias': [
        {'field': 'code', 'operator': 'like', 'value': this.params.code ? '%' + this.params.code + '%' : null},
        {'field': 'name', 'operator': 'like', 'value': this.params.name ? '%' + this.params.name + '%' : null},
        {'field': 'type', 'operator': 'in', 'values': this.params.types},
        {'field': 'status', 'value': this.params.status},
        {'field': 'appCode', 'value': this.params.appCode}
      ],
      'page': {
        'pageSize': this.pageSize,
        'pageNum': this.pageNum - 1
      },
      'sorts': getSorts(this.sortMap)
    };
    this.permissionService.findAllByParam(param).subscribe((res: ResponseResultModel) => {
      // 判断返回结果是否为空或null
      if (res && res.result) {
        const result: PagerResultModel = res.result;
        this.tableData = result.list;
        this.total = result.total;
      }
      // 加载动画关闭
      this.loading = false;
    });
  }

  /**
   * 过滤方法
   *
   * @param types
   * @param status
   */
  filter(types: string[], status: string): void {
    this.params.types = [...types];
    this.params.status = !!status ? status : '';
    this.findAllByParam();
  }

  /**
   * 排序监听
   *
   * @param name
   * @param value
   */
  sort(name: string, value: string): void {
    for (const key of Object.keys(this.sortMap)) {
      if (key === name) {
        this.sortMap[key] = value;
      }
    }
    this.findAllByParam();
  }

  /**
   * 删除前确认
   *
   * @param id 用户ID
   */
  confirmDelete(id: string): void {
    this.deleteById(id);
  }

  /**
   * 取消删除事件回调
   */
  cancelDelete(): void {
    this.nzMessageService.info(this.global.DELETE_CANTER_MSG);
  }

  /**
   * 由ID删除权限信息
   *
   * @param id 权限ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.permissionService.deleteById(id).subscribe((res: ResponseResultModel) => {
      this.nzMessageService.remove(msgId);
      /// 判断返回状态码是否为200（成功状态码）
      if (res.status === 200) {
        this.nzMessageService.success(this.global.DELETE_SUCESS_MSG);
      }
      this.findAllByParam();
    });
  }

  /**
   * 打开模态框
   *
   * @param id 权限ID
   * @param appCode 应用ID
   * @param title 模态框标题
   */
  openModel(id: string, appCode: string, title: string): NzModalRef {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: PermissionEditComponent,
      nzWidth: 600,
      nzComponentParams: {
        id: id,
        appCode: appCode
      },
      nzFooter: [
        {
          label: '返回',
          onClick: (componentInstance) => {
            componentInstance.destroyModal();
          }
        },
        {
          label: '提交',
          type: 'primary',
          onClick: (componentInstance) => {
            componentInstance.submitForm();
          }
        }
      ]
    });
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllByParam();
      }
    });
    return modal;
  }

}
