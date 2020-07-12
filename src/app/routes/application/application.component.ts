import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
import { TreeTableConfigModel } from '../../shared/tree-table/models/tree-table-config.model';
import { TreeTableColumnModel } from '../../shared/tree-table/models/tree-table-columns.model';
import { TreeTableDataModel } from '../../shared/tree-table/models/tree-table-data.model';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { PagerResultModel } from '../../@core/net/pager-result.model';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ApplicationService } from './application.service';
import { listToBaseTree } from '../../@core/util/tree-node';
import { validatePerms } from '../../@core/util/perms-validators';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  /** 全局常量 */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 加载动画，默认关闭 */
  loading: boolean;
  /** tree-table配置 */
  config: TreeTableConfigModel;
  /** tree-table列配置 */
  columns: TreeTableColumnModel[];
  /** tree-table数据源 */
  data: TreeTableDataModel;
  /** 类型 */
  @ViewChild('rowType', {read: TemplateRef}) rowType: TemplateRef<any>;
  /** 图标 */
  @ViewChild('rowIcon', {read: TemplateRef}) rowIcon: TemplateRef<any>;
  /** 操作 */
  @ViewChild('rowAction', {read: TemplateRef, static: true}) rowAction: TemplateRef<any>;
  /** 页面权限校验 */
  perms = {
    save: false,
    update: false,
    delete: false
  };

  constructor(private applicationSerivce: ApplicationService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.perms = {
      save: validatePerms(['application:save']),
      update: validatePerms(['application:update']),
      delete: validatePerms(['application:delete'])
    };
    // 初始化tree-table配置
    this.config = new TreeTableConfigModel({
      level: 0
    });
    // 初始化tree-table列配置
    this.columns = [
      {
        title: '全称',
        key: 'name'
      },
      {
        title: '编码',
        key: 'code'
      },
      {
        title: '类型',
        template: this.rowType
      },
      {
        title: '图标',
        template: this.rowIcon
      },
      {
        title: '路径',
        key: 'url'
      },
      {
        title: '排序',
        key: 'sort'
      }
    ];
    // 判断是否显示操作列
    if (this.perms.update || this.perms.delete) {
      this.columns.push({
        title: '操作',
        width: '120px',
        template: this.rowAction
      });
    }
    this.findAllByParam();
  }

  /**
   * 获取列表信息
   */
  findAllByParam(): void {
    // 加载动画开启
    this.loading = true;
    this.applicationSerivce.findAll().subscribe((res: ResponseResultModel) => {
      // 加载动画关闭
      this.loading = false;
      // 判断返回结果是否为空或null
      if (res && res.result) {
        const result: PagerResultModel = res.result;
        this.data = new TreeTableDataModel(listToBaseTree(result.list));
      }
    });
  }

  /**
   * 打开新增页面
   */
  showSave() {
    const modal = this.openModel(this.global.INSERT_FLAG, '新增应用信息');
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllByParam();
      }
    });
  }

  /**
   * 打开修改页面
   *
   * @param id 模块ID
   */
  showUpdate(id: string) {
    const modal = this.openModel(id, '修改应用信息');
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllByParam();
      }
    });
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
   * 由ID删除模块信息
   *
   * @param id 模块ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.applicationSerivce.deleteById(id).subscribe((res: ResponseResultModel) => {
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
   * @param id 模块ID
   * @param title 模态框标题
   */
  openModel(id: string, title: string): NzModalRef {
    return this.modalService.create({
      nzTitle: title,
      nzContent: ApplicationEditComponent,
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
