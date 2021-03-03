import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from "../../../../@core/constant/GlobalConstants";
import { Observable } from "rxjs";
import { RentContractModel } from "../rent-contract.model";
import { RentTransportModel } from "../../rent-transport/rent-transport.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { RentTransportService } from "../../rent-transport/rent-transport.service";
import { RentContractService } from "../rent-contract.service";
import { RentCategoryService } from "../../rent-category/rent-category.service";
import { FormBuilder } from "@angular/forms";
import { DatePipe, Location } from '@angular/common';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { ResponseResultModel } from "../../../../@core/net/response-result.model";
import { Decimal } from "decimal.js";
import { RentSpecService } from "../../rent-spec/rent-spec.service";
import { RentSpecModel } from "../../rent-spec/rent-spec.model";
import { listGroupBy, listToJson } from "../../../../@core/util/list-utils";
import { RentCategoryModel } from "../../rent-category/rent-category.model";

@Component({
  selector: 'app-rent-contract-balance',
  templateUrl: './rent-contract-balance.component.html',
  styleUrls: ['./rent-contract-balance.component.scss']
})
export class RentContractBalanceComponent implements OnInit {

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
  // 类别品名map
  rentCategoryMap: any = {};
  /** 物品规格集合 */
  rentSpecs: RentSpecModel[];
  /** 已租天数 */
  rentalDays: number;
  /** 日期格式 */
  dateFormat: string = 'yyyy-MM-dd';

  constructor(private route: ActivatedRoute,
              private rentTransportService: RentTransportService,
              private rentContractService: RentContractService,
              private rentCategoryService: RentCategoryService,
              private rentSpecService: RentSpecService,
              private fb: FormBuilder,
              private location: Location,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit(): void {
    // 获取路由参数
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.routeParams.id = params.get('id');
      this.init();
    });
  }

  init(): void {
    // 查询
    this.rentContractService.findCascadeById(this.routeParams.id)
      .subscribe((res: ResponseResultModel) => {
        this.rentContract = res.result;
        this.rentContract.amountPayable = this.rentContract.amountPayable ? this.rentContract.amountPayable : 0;
        this.rentContract.amountPaid = this.rentContract.amountPaid ? this.rentContract.amountPaid : 0;
        this.rentDays();
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
        // 设置类别品名
        if (this.rentContract.rentContractCategories) {
          const categoryIds = this.rentContract.rentContractCategories.map(({categoryId}) => categoryId);
          this.rentCategoryService.findByIds(categoryIds).subscribe((res: ResponseResultModel) => {
            this.rentContract.rentCategories = res.result.list;
            if (this.rentContract.rentCategories) {
              this.rentCategoryMap = listToJson(this.rentContract.rentCategories, 'id');
              // 处理运输单与规格关联
              if (this.rentContract.rentTransportSpecs) {
                this.detailTable();
              }
            }
          });
        }
      });
  }

  /**
   * 结算日期修改回调
   *
   * @param $event 结算日期
   */
  balanceDateChange($event: Date) {
    // 初始化日期管道对象
    const datePipe = new DatePipe('en-US');
    this.rentContract.balanceDate = datePipe.transform($event, this.dateFormat);
    // 重新计算已租天数
    this.rentDays();
    // 重新计算明细
    this.calculateRent();
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
    // 判断计算方式
    if (this.rentContract.computeMode == this.global.COMPUTE_MODE_ALL) {
      // 如果算头算尾那么已租天数加一天
      this.rentalDays = this.rentalDays + 1;
    }
  }

  /**
   * 明细表格
   */
  detailTable() {
    // 合同下所有物品规格id集合
    const specIds: string[] = this.rentContract.rentTransportSpecs.map(v => v.specId);
    this.rentSpecService.findByIds(specIds).subscribe((res: ResponseResultModel) => {
      this.rentSpecs = res.result.list;
      this.calculateRent();
    });
  }

  /**
   * 计算租金
   */
  calculateRent() {
    if (this.rentSpecs) {
      // 出库单ID集合
      let outTransportIds = null;
      if (this.outTransports) {
        outTransportIds = this.outTransports.map(v => v.id);
      }
      // 入库单ID集合
      let inTransportIds = null;
      if (this.inTransports) {
        inTransportIds = this.inTransports.map(v => v.id);
      }
      // 运输单与物品规格关联
      const transportSpecMap = listGroupBy(this.rentContract.rentTransportSpecs, 'specId');
      this.rentSpecs.forEach(v => {
        v.outNum = 0;
        v.inNum = 0;
        if (transportSpecMap[v.id]) {
          transportSpecMap[v.id].forEach(ts => {
            if (outTransportIds && outTransportIds.includes(ts['transportId'])) {
              v.outNum = this.add(v.outNum, ts['num'])
            }
            if (inTransportIds && inTransportIds.includes(ts['transportId'])) {
              v.inNum = this.add(v.inNum, ts['num'])
            }
          })
        }
        // 计算租金
        v.rent = this.mul(v.outNum * this.rentalDays, this.rentCategoryMap[v.categoryId]?.dailyRent);
        this.rentContract.amountPayable = this.add(this.rentContract.amountPayable, v.rent);
      });
    }
  }

  /**
   * 加法，不丢精度
   *
   * @param a a
   * @param b b
   */
  add(a: number, b: number): number {
    if (!a) {
      a = 0;
    }
    if (!b) {
      b = 0;
    }
    return new Decimal(a.toString()).add(new Decimal(b.toString())).toNumber();
  }

  /**
   * 乘法，不丢精度
   *
   * @param num 件数
   * @param quantity 换算数量
   */
  mul(num: number, quantity: number): number {
    if (!num) {
      num = 0;
    }
    if (!quantity) {
      quantity = 0;
    }
    return Number(new Decimal(num.toString()).mul(new Decimal(quantity.toString()))
      .toFixed(0, Decimal.ROUND_DOWN));
  }

}
