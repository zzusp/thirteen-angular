import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { RentContractModel } from './rent-contract.model';
import { RentContractService } from './rent-contract.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { getSorts } from '../../../@core/util/table-sort';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { PagerResultModel } from '../../../@core/net/pager-result.model';
import { RentRenterModel } from '../rent-renter/rent-renter.model';
import { RentRenterService } from '../rent-renter/rent-renter.service';
import { Router } from '@angular/router';
import { RentContractEditComponent } from './rent-contract-edit/rent-contract-edit.component';

@Component({
  selector: 'app-rent-contract',
  templateUrl: './rent-contract.component.html',
  styleUrls: ['./rent-contract.component.scss']
})
export class RentContractComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 查询参数  */
  params: any = {
    renterId: '',
    location: ''
  };
  /** 当前页码  */
  pageNum: number = 1;
  /** 每页显示记录数  */
  pageSize: number = 10;
  /** 总记录数  */
  total: number = 0;
  /** 表格数据  */
  tableData: RentContractModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 排序  */
  sortMap = {
    location: null,
    contacts: null,
    signDate: null,
    balanceDate: null,
    createTime: 'descend'
  };
  /** 承租方下拉框数据 */
  rentRenters: RentRenterModel[] = [];
  /** table展示用map */
  rentRenterMap: any = {};
  /** 页面权限校验  */
  perms = {
    save: true,
    update: true,
    detail: true,
    delete: true
  };

  constructor(private rentContractService: RentContractService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService,
              private router: Router,
              private rentRenterService: RentRenterService) {
  }

  ngOnInit(): void {
    // 初始化物品种类下拉框
    this.rentRenterService.findAll()
      .subscribe((res: ResponseResultModel) => {
        this.rentRenters = res.result.list;
        this.rentRenters.forEach(v => this.rentRenterMap[v.id] = v.name);
      });
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
        {'field': 'renterId', 'value': this.params.renterId},
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
    this.rentContractService.findAllByParam(param).subscribe((res: ResponseResultModel) => {
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
   * 是否隐藏子页面
   */
  hiddenSubPage(): boolean {
    return !this.router.isActive('/rent/rent-contract/detail', false);
  }

  /**
   * 打开详情页面
   *
   * @param id 合同ID
   */
  showDetail(id: string) {
    this.router.navigate(['/rent/rent-contract/detail', id]);
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
    this.rentContractService.deleteById(id).subscribe((res: ResponseResultModel) => {
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
      nzContent: RentContractEditComponent,
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
