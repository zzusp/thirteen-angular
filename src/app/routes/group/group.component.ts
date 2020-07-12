import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GroupService } from './group.service';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { PagerResultModel } from '../../@core/net/pager-result.model';
import { TreeTableConfigModel } from '../../shared/tree-table/models/tree-table-config.model';
import { TreeTableColumnModel } from '../../shared/tree-table/models/tree-table-columns.model';
import { TreeTableDataModel } from '../../shared/tree-table/models/tree-table-data.model';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
import { listToBaseTree } from '../../@core/util/tree-node';
import { validatePerms } from '../../@core/util/perms-validators';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

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
  /** 操作 */
  @ViewChild('rowAction', {read: TemplateRef, static: true}) rowAction: TemplateRef<any>;
  /** 页面权限校验 */
  perms = {
    save: false,
    update: false,
    delete: false
  };

  constructor(private groupService: GroupService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.perms = {
      save: validatePerms(['group:save']),
      update: validatePerms(['group:update']),
      delete: validatePerms(['group:delete'])
    };
    // 初始化tree-table配置
    this.config = new TreeTableConfigModel({
      level: 2
    });
    // 初始化tree-table列配置
    this.columns = [
      {
        title: '全称',
        key: 'name'
      },
      {
        title: '简称',
        key: 'shortName'
      },
      {
        title: '编码',
        key: 'code'
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
    this.findAll();
  }

  /**
   * 获取列表信息
   */
  findAll(): void {
    // 加载动画开启
    this.loading = true;
    this.groupService.findAll().subscribe((res: ResponseResultModel) => {
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
    const modal = this.openModel(this.global.INSERT_FLAG, '新增组织信息');
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAll();
      }
    });
  }

  /**
   * 打开修改页面
   *
   * @param id 组织ID
   */
  showUpdate(id: string) {
    const modal = this.openModel(id, '修改组织信息');
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAll();
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
   * 由ID删除组织信息
   *
   * @param id 组织ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.groupService.deleteById(id).subscribe((res: ResponseResultModel) => {
      this.nzMessageService.remove(msgId);
      // 判断返回状态码是否为200（成功状态码）
      if (res.status === 200) {
        this.nzMessageService.success(this.global.DELETE_SUCESS_MSG);
      }
      this.findAll();
    });
  }

  /**
   * 打开模态框
   *
   * @param id 组织ID
   * @param title 模态框标题
   */
  openModel(id: string, title: string): NzModalRef {
    return this.modalService.create({
      nzTitle: title,
      nzContent: GroupEditComponent,
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
