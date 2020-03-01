import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { TreeTableConfigModel } from '../../../shared/tree-table/models/tree-table-config.model';
import { TreeTableColumnModel } from '../../../shared/tree-table/models/tree-table-columns.model';
import { TreeTableDataModel } from '../../../shared/tree-table/models/tree-table-data.model';
import { DeptService } from './dept.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { DeptEditComponent } from './dept-edit/dept-edit.component';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { validatePerms } from '../../../@core/util/perms-validators';
import { PagerResultModel } from '../../../@core/net/pager-result.model';
import { listToBaseTree } from '../../../@core/util/tree-node';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 加载动画，默认关闭  */
  loading: boolean;
  /**
   * tree-table配置
   */
  config: TreeTableConfigModel;
  /**
   * tree-table列配置
   */
  columns: TreeTableColumnModel[];
  /**
   * tree-table数据源
   */
  data: TreeTableDataModel;
  /**
   * 操作
   */
  @ViewChild('rowAction', {read: TemplateRef}) rowAction: TemplateRef<any>;
  /** 页面权限校验  */
  perms = {
    save: false,
    update: false,
    delete: false
  };

  constructor(private deptService: DeptService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.perms = {
      save: validatePerms(['dept:save']),
      update: validatePerms(['dept:update']),
      delete: validatePerms(['dept:delete'])
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
    this.findAllByParam();
  }

  /**
   * 获取列表信息
   */
  findAllByParam(): void {
    // 加载动画开启
    this.loading = true;
    this.deptService.findAll().subscribe((res: ResponseResultModel) => {
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
    const modal = this.openModel(this.global.INSERT_FLAG, '新增部门信息');
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
   * @param id 部门ID
   */
  showUpdate(id: string) {
    const modal = this.openModel(id, '修改部门信息');
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
   * 由ID删除部门信息
   *
   * @param id 部门ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.deptService.deleteById(id).subscribe((res: ResponseResultModel) => {
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
   * @param id 部门ID
   * @param title 模态框标题
   */
  openModel(id: string, title: string): NzModalRef {
    return this.modalService.create({
      nzTitle: title,
      nzContent: DeptEditComponent,
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
