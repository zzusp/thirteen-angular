import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { GlobalConstants } from "../../@core/constant/GlobalConstants";
import { DmTableModel } from "./dm-table.model";
import {DmTableService} from "./dm-table.service";
import {HttpParams} from "@angular/common/http";
import {ResponseResultModel} from "../../@core/net/response-result.model";
import {PagerResultModel} from "../../@core/net/pager-result.model";
import { DictService } from '../dict/dict.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { DictEditComponent } from '../dict/dict-edit/dict-edit.component';
import { DmTableEditComponent } from './dm-table-edit/dm-table-edit.component';

@Component({
  selector: 'app-dm-table',
  templateUrl: './dm-table.component.html',
  styleUrls: ['./dm-table.component.scss']
})
export class DmTableComponent implements OnInit {

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
  tableData: DmTableModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 排序  */
  sortMap = {
    code: null,
    name: null,
    status: null,
    createTime: 'asc',
    updateTime: null
  };
  /** 页面权限校验  */
  perms = {
    save: true,
    update: true,
    delete: true
  };

  constructor(private dmTableService: DmTableService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.statusArr = [
      {text: '启用', value: this.global.ACTIVE_ON},
      {text: '禁用', value: this.global.ACTIVE_OFF}];
    this.findAllBySpecification();
  }

  /**
   * 获取列表信息
   */
  findAllBySpecification(): void {
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
    this.dmTableService.findAllBySpecification(param)
      .subscribe((res: ResponseResultModel) => {
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
   * 生效（根据最新的表信息，生成新的表结构）
   */
  refresh() {
    this.dmTableService.refresh().subscribe((res: ResponseResultModel) => {
      });
  }

  /**
   * 过滤方法
   *
   * @param status
   */
  filter(status: string): void {
    this.params.status = !!status ? status : '';
    this.findAllBySpecification();
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
    this.findAllBySpecification();
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
   * 获取排序参数
   */
  getOrderBy(): string {
    const arr = [];
    for (const key of Object.keys(this.sortMap)) {
      if (this.sortMap[key] != null) {
        arr.push(key + ' ' + this.sortMap[key].replace('end', ''));
      }
    }
    return arr.toString();
  }

  /**
   * 打开新增页面
   */
  showSave() {
    const modal = this.openModel(this.global.INSERT_FLAG, false, '新增表信息');

    // 模态框打开后回调事件
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllBySpecification();
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
   * @param id 数据字典ID
   */
  showUpdate(id: string) {
    const modal = this.openModel(id, false, '修改表信息');

    // 模态框打开后回调事件
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllBySpecification();
      }
    });
  }

  /**
   * 打开拷贝页面
   *
   * @param id 数据字典ID
   */
  showCopy(id: string) {
    const modal = this.openModel(id, true, '拷贝表信息');

    // 模态框打开后回调事件
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      console.log('[afterClose] emitted!')
      if (result && result.refresh) {
        // 刷新列表
        this.findAllBySpecification();
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
   * 由ID删除数据字典信息
   *
   * @param id 数据字典ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.dmTableService.deleteById(id).subscribe((res: ResponseResultModel) => {
      this.nzMessageService.remove(msgId);
      // 判断返回状态码是否为200（成功状态码）
      if (res.status === 200) {
        this.nzMessageService.success(this.global.DELETE_SUCESS_MSG);
      }
      this.findAllBySpecification();
    });
  }

  /**
   * 打开模态框
   *
   * @param id 数据字典ID
   * @param isCopy 是否为拷贝操作
   * @param title 模态框标题
   */
  openModel(id: string, isCopy: boolean, title: string): NzModalRef {
    return this.modalService.create({
      nzTitle: title,
      nzContent: DmTableEditComponent,
      nzWidth: 1400,
      nzComponentParams: {
        id: id,
        isCopy: isCopy
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
