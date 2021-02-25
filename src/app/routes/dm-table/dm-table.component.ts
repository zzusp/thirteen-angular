import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from "../../@core/constant/GlobalConstants";
import { DmTableModel } from "./dm-table.model";
import { DmTableService } from "./dm-table.service";
import { ResponseResultModel } from "../../@core/net/response-result.model";
import { PagerResultModel } from "../../@core/net/pager-result.model";
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { DmTableEditComponent } from './dm-table-edit/dm-table-edit.component';
import { getSorts } from "../../@core/util/table-sort";

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
      {text: '启用', value: this.global.STATUS_ON},
      {text: '禁用', value: this.global.STATUS_OFF}];
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
      'sorts': getSorts(this.sortMap)
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
    const modal = this.modalService.create({
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
    // 模态框关闭后回调事件
    modal.afterClose.subscribe((result) => {
      if (result && result.refresh) {
        // 刷新列表
        this.findAllBySpecification();
      }
    });
    return modal;
  }

}
