import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { RentBaseInfoModel } from './rent-base-info.model';
import { RentBaseInfoService } from './rent-base-info.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { getSorts } from '../../../@core/util/table-sort';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { PagerResultModel } from '../../../@core/net/pager-result.model';
import { RentBaseInfoEditComponent } from './rent-base-info-edit/rent-base-info-edit.component';

@Component({
  selector: 'app-rent-base-info',
  templateUrl: './rent-base-info.component.html',
  styleUrls: ['./rent-base-info.component.scss']
})
export class RentBaseInfoComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 查询参数  */
  params: any = {
    name: '',
    location: ''
  };
  /** 当前页码  */
  pageNum: number = 1;
  /** 每页显示记录数  */
  pageSize: number = 10;
  /** 总记录数  */
  total: number = 0;
  /** 表格数据  */
  tableData: RentBaseInfoModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 排序  */
  sortMap = {
    name: null,
    location: null,
    contacts: null,
    mobile: null,
    createTime: 'descend',
    updateTime: null
  };
  /** 页面权限校验  */
  perms = {
    save: true,
    update: true,
    delete: true
  };

  constructor(private rentBaseInfoService: RentBaseInfoService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit(): void {
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
        {'field': 'name', 'operator': 'like', 'value': this.params.name ? '%' + this.params.name + '%' : null},
        {
          'field': 'location',
          'operator': 'like',
          'value': this.params.location ? '%' + this.params.location + '%' : null
        },
      ],
      'page': {
        'pageSize': this.pageSize,
        'pageNum': this.pageNum - 1
      },
      'sorts': getSorts(this.sortMap)
    };
    this.rentBaseInfoService.findAllByParam(param).subscribe((res: ResponseResultModel) => {
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
   * 由ID删除信息
   *
   * @param id ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.rentBaseInfoService.deleteById(id).subscribe((res: ResponseResultModel) => {
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
      nzContent: RentBaseInfoEditComponent,
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
