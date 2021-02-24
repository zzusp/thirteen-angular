import { Component, OnInit } from '@angular/core';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { PagerResultModel } from '../../@core/net/pager-result.model';
import { RoleService } from './role.service';
import { RoleModel } from './role.model';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
import { Router } from '@angular/router';
import { validatePerms } from '../../@core/util/perms-validators';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 查询参数  */
  params: any = {
    code: '',
    name: '',
    status: ''
  };
  /** 是否启用  */
  statusArr: any[] = [];
  /** 当前页码  */
  pageNum: number = 1;
  /** 每页显示记录数  */
  pageSize: number = 10;
  /** 总记录数  */
  total: number = 0;
  /** 表格数据  */
  tableData: RoleModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 排序  */
  sortMap = {
    code: null,
    name: null,
    status: null,
    createTime: 'descend',
    updateTime: null
  };
  /** 页面权限校验  */
  perms = {
    save: false,
    update: false,
    delete: false,
    authorize: false
  };

  constructor(private roleService: RoleService,
              private modalService: NzModalService,
              private nzMessageService: NzMessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.perms = {
      save: validatePerms(['role:save']),
      update: validatePerms(['role:update']),
      delete: validatePerms(['role:delete']),
      authorize: validatePerms(['role:authorize'])
    };
    this.statusArr = [
      {text: '启用', value: this.global.STATUS_ON},
      {text: '禁用', value: this.global.STATUS_OFF}];
    this.findAllByParam();
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
        {'field': 'status', 'value': this.params.status}
      ],
      'page': {
        'pageSize': this.pageSize,
        'pageNum': this.pageNum - 1
      },
      'sorts': this.getSorts()
    };
    this.roleService.findAllByParam(param).subscribe((res: ResponseResultModel) => {
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
   * @param status
   */
  filter(status: string): void {
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
   * 获取排序参数
   */
  getSorts(): any[] {
    const arr = [];
    for (const key of Object.keys(this.sortMap)) {
      if (this.sortMap[key] != null) {
        arr.push({field: key, orderBy: this.sortMap[key].replace('end', '')});
      }
    }
    return arr;
  }

  /**
   * 打开新增页面
   */
  showSave() {
    const modal = this.openModel(this.global.INSERT_FLAG, '新增角色信息');
    // 模态框打开后回调事件
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllByParam();
      }
    });
    // 延时到模态框实例创建
    window.setTimeout(() => {
      const instance = modal.getContentComponent();
      instance.title = 'sub title is changed';
    }, 2000);
  }

  /**
   * 打开修改页面
   *
   * @param id 角色ID
   */
  showUpdate(id: string) {
    const modal = this.openModel(id, '修改角色信息');
    // 模态框打开后回调事件
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllByParam();
      }
    });
  }

  /**
   * 打开角色授权页面
   *
   * @param id 角色ID
   */
  showAuthorize(id: string) {
    this.router.navigate(['/system/role-authorize', id]);
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
   * 由ID删除角色信息
   *
   * @param id 角色ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.roleService.deleteById(id).subscribe((res: ResponseResultModel) => {
      this.nzMessageService.remove(msgId);
      // 判断返回状态码是否为200（成功状态码）
      if (res.status === 200) {
        this.nzMessageService.success(this.global.DELETE_SUCESS_MSG);
      }
      this.findAllByParam();
    });
  }

  /**
   * 打开模态框
   *
   * @param id 角色ID
   * @param title 模态框标题
   */
  openModel(id: string, title: string): NzModalRef {
    return this.modalService.create({
      nzTitle: title,
      nzContent: RoleEditComponent,
      nzWidth: 600,
      nzComponentParams: {
        id: id
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
  }

}
