import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
import { BizTypeModel } from './biz-type.model';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { PagerResultModel } from '../../@core/net/pager-result.model';
import { BizTypeEditComponent } from './biz-type-edit/biz-type-edit.component';
import { BizTypeService } from './biz-type.service';
import { validatePerms } from '../../@core/util/perms-validators';
import { getSorts } from "../../@core/util/table-sort";

@Component({
  selector: 'app-biz-type',
  templateUrl: './biz-type.component.html',
  styleUrls: ['./biz-type.component.scss']
})
export class BizTypeComponent implements OnInit {

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
  tableData: BizTypeModel[] = [];
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
    delete: false
  };

  constructor(private bizTypeService: BizTypeService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.perms = {
      save: validatePerms(['bizType:save']),
      update: validatePerms(['bizType:update']),
      delete: validatePerms(['bizType:delete'])
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
      'sorts': getSorts(this.sortMap)
    };
    this.bizTypeService.findAllByParam(param).subscribe((res: ResponseResultModel) => {
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
   * 由ID删除业务类型信息
   *
   * @param id 业务类型ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.bizTypeService.deleteById(id).subscribe((res: ResponseResultModel) => {
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
   * @param id ID
   * @param title 模态框标题
   */
  openModel(id: string, title: string): NzModalRef {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: BizTypeEditComponent,
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
