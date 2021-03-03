import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { RentContractModel } from '../rent-contract.model';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { RentContractService } from '../rent-contract.service';
import { RentCategoryService } from '../../rent-category/rent-category.service';
import { RentTransportModel } from '../../rent-transport/rent-transport.model';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { RentTransportEditComponent } from '../../rent-transport/rent-transport-edit/rent-transport-edit.component';
import { RentTransportService } from '../../rent-transport/rent-transport.service';

import { Decimal } from 'decimal.js';

@Component({
  selector: 'app-rent-contract-detail',
  templateUrl: './rent-contract-detail.component.html',
  styleUrls: ['./rent-contract-detail.component.scss']
})
export class RentContractDetailComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 路由参数 */
  routeParams: any = {id: null};
  /** 合同信息对象 */
  rentContract: RentContractModel;
  /** 出库单集合 */
  outTransports: RentTransportModel[];
  /** 入库单集合 */
  inTransports: RentTransportModel[];
  /** 已租天数 */
  rentalDays: number;
  /** 日期格式 */
  dateFormat: string = 'yyyy-MM-dd';

  constructor(private route: ActivatedRoute,
              private rentTransportService: RentTransportService,
              private rentContractService: RentContractService,
              private rentCategoryService: RentCategoryService,
              private fb: FormBuilder,
              private location: Location,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit(): void {
    // 获取路由参数
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.routeParams.id = params.get('id');
      this.initDetail();
    });
  }

  initDetail(): void {
    // 查询
    this.rentContractService.findCascadeById(this.routeParams.id)
      .subscribe((res: ResponseResultModel) => {
        this.rentContract = res.result;
        this.rentDays();
        // 判断计算方式
        if (this.rentContract.computeMode == this.global.COMPUTE_MODE_ALL) {
          // 如果算头算尾那么已租天数加一天
          this.rentalDays = this.rentalDays + 1;
        }
        // 设置类别品名
        if (this.rentContract.rentContractCategories) {
          const categoryIds = this.rentContract.rentContractCategories.map(({categoryId}) => categoryId);
          this.rentCategoryService.findByIds(categoryIds).subscribe((res: ResponseResultModel) => {
            this.rentContract.rentCategories = res.result.list;
          });
        }
        // 处理运输单
        if (this.rentContract.rentTransports) {
          this.outTransports = [];
          this.inTransports = [];
          this.rentContract.rentTransports.forEach(v => {
            if (v.type == this.global.TRANSPORT_OUT) {
              this.outTransports.push(v);
            } else if (v.type == this.global.TRANSPORT_IN) {
              this.inTransports.push(v);
            }
          });
        }
      });
  }

  /**
   * 计算已租天数
   */
  rentDays(): void {
    // 初始化日期管道对象
    const datePipe = new DatePipe('en-US');
    if (!this.rentContract.balanceDate) {
      this.rentContract.balanceDate = datePipe.transform(Date.now(), this.dateFormat);
    }
    const sign = Date.parse(this.rentContract.signDate);
    const balance = Date.parse(this.rentContract.balanceDate);
    // 计算已租天数
    this.rentalDays = Number(new Decimal((balance - sign) / (24 * 60 * 60 * 1000))
      .toFixed(0, Decimal.ROUND_DOWN));
  }

  /**
   * 删除前确认
   *
   * @param id 运输单ID
   */
  confirmDelete(id: string): void {
    this.deleteTransportById(id);
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
  deleteTransportById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.rentTransportService.deleteById(id).subscribe((res: ResponseResultModel) => {
      this.nzMessageService.remove(msgId);
      // 判断返回状态码是否为200（成功状态码）
      if (res.status === 200) {
        this.nzMessageService.success(this.global.DELETE_SUCESS_MSG);
      }
      this.initDetail();
    });
  }

  /**
   * 返回上一页
   */
  goBack() {
    this.location.back();
  }

  /**
   * 打开模态框
   *
   * @param id ID
   * @param type 运输单类型 0：出库；1：入库
   * @param title 模态框标题
   */
  openModel(id: string, type: number, title: string): NzModalRef {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: RentTransportEditComponent,
      nzWidth: 800,
      nzComponentParams: {
        id: id,
        contractId: this.routeParams.id,
        type: type
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
        this.initDetail();
      }
    });
    return modal;
  }

}
