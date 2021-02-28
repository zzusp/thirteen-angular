import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { RentTransportService } from '../rent-transport.service';
import { RentSpecService } from '../../rent-spec/rent-spec.service';
import { RentCategoryService } from '../../rent-category/rent-category.service';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { RentSpecModel } from '../../rent-spec/rent-spec.model';
import { RentCategoryModel } from '../../rent-category/rent-category.model';
import { RentTransportModel } from '../rent-transport.model';
import { listToJson } from '../../../../@core/util/list-utils';

import { Decimal } from 'decimal.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rent-transport-edit',
  templateUrl: './rent-transport-edit.component.html',
  styleUrls: ['./rent-transport-edit.component.scss']
})
export class RentTransportEditComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 运输单ID */
  @Input() id: string;
  /** 合同ID */
  @Input() contractId: string;
  /** 运输单类型 0：出库；1：入库 */
  @Input() type: number;
  /** 编辑表单 */
  editForm: FormGroup;
  /** 运输单与规格关联 */
  transportSpecs: any[] = [];
  /** 类别品名下拉框数据 */
  rentCategories: RentCategoryModel[] = [];
  /** 选中的类别品名code */
  selectedCategory: string;
  /** 所有类别品名数据，key为id */
  rentCategoryMap: any = {};
  /** 所有物品规格数据，key为类别品名编码 */
  rentSpcMap: any = {};
  /** 选中的物品规格 */
  selectedSpec: RentSpecModel;
  /** 日期格式 */
  dateFormat: string = 'yyyy-MM-dd';

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private rentTransportService: RentTransportService,
              private rentCategoryService: RentCategoryService,
              private rentSpecService: RentSpecService) {
  }

  ngOnInit(): void {
    // 初始化类别品名下拉框，物品规格下拉框
    const rentCategoryReq = this.rentCategoryService.findAll();
    const rentSpecReq = this.rentSpecService.findAll();
    // 发出请求
    forkJoin([rentCategoryReq, rentSpecReq])
      .subscribe((results: ResponseResultModel[]) => {
        const rentCategoryRes = results[0];
        const rentSpecRes = results[1];
        this.rentCategories = rentCategoryRes.result.list;
        this.rentCategoryMap = listToJson(this.rentCategories, 'id');
        this.rentSpcMap = listToJson(rentSpecRes.result.list, 'categoryCode');
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      contractId: [null, Validators.required],
      location: null,
      haulier: [null, Validators.required],
      deliveryDate: [null, Validators.required],
      carriage: null,
      type: [null, Validators.required],
      rentTransportSpecs: null,
      remark: [null, Validators.maxLength(250)],
      version: [null]
    });
    // 所有需加载的资源都已加载完成，初始化表单
    if (this.id !== this.global.INSERT_FLAG) {
      this.initUpdate();
    } else {
      this.initSave();
    }
  }

  /**
   * 新增表单初始化
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentTransportService.insert(params);
    };
    // 表单重置
    this.editForm.reset({
      id: null,
      contractId: this.contractId,
      location: null,
      haulier: null,
      deliveryDate: null,
      carriage: null,
      type: this.type,
      remark: null,
      version: null
    });
  }

  /**
   * 初始化更新
   */
  initUpdate() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentTransportService.update(params);
    };
    // 获取业务类型信息初始化表单
    this.rentTransportService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: RentTransportModel = res.result;
        // 表单重置
        this.editForm.reset({
          id: model.id,
          contractId: model.contractId,
          location: model.location,
          haulier: model.haulier,
          deliveryDate: model.deliveryDate,
          carriage: model.carriage,
          type: model.type,
          remark: model.remark,
          version: model.version
        });
        if (model.rentTransportSpecs != null) {
          // 设置已选中的物品规格
          model.rentTransportSpecs.forEach(v => {
            this.transportSpecs.push(v);
          });
        }
      });
  }

  /**
   * 表单提交
   */
  submitForm() {
    console.log(this.editForm.getRawValue());
    for (const key of Object.keys(this.editForm.controls)) {
      this.editForm.controls[key].markAsDirty();
      this.editForm.controls[key].updateValueAndValidity({onlySelf: true});
    }
    if (this.editForm.valid && this.validTransportSpec()) {
      this.editForm.get('rentTransportSpecs').setValue(this.transportSpecs);
      // 初始化日期管道对象
      const datePipe = new DatePipe('en-US');
      const deliveryDate = this.editForm.get('deliveryDate').value;
      this.editForm.get('deliveryDate').setValue(datePipe.transform(deliveryDate, this.dateFormat));
      this.request(this.editForm.getRawValue()).subscribe((res: ResponseResultModel) => {
        // 清空表单
        this.editForm.reset();
        // 关闭模态框
        this.destroyModal(true);
      });
    }
  }

  /**
   * 校验关联
   */
  validTransportSpec(): boolean {
    let flag: boolean = false;
    if (!this.transportSpecs || this.transportSpecs.length == 0) {
      return flag;
    }
    flag = true;
    this.transportSpecs.forEach(v => {
      if (!v.categoryId || !v.specId || !v.num || v.num <= 0) {
        flag = false;
      }
    });
    return flag;
  }

  /**
   * 更新选中的物品换算数量
   *
   * @param categoryId 类别品名id
   * @param specId 物品规格id
   */
  getRowQuantity(categoryId: string, specId: string): number {
    if (this.rentCategoryMap.hasOwnProperty(categoryId)) {
      const categoryCode = this.rentCategoryMap[categoryId][0].code;
      if (this.rentSpcMap && this.rentSpcMap.hasOwnProperty(categoryCode)) {
        const rentSpc = this.rentSpcMap[categoryCode].filter(v => v.id == specId);
        return rentSpc && rentSpc[0] ? rentSpc[0].quantity : 0;
      }
    }
    return 0;
  }

  /**
   * 乘法，不丢精度
   *
   * @param num 件数
   * @param quantity 换算数量
   */
  mul(num: number, quantity: number) {
    if (!num) {
      num = 0;
    }
    if (!quantity) {
      quantity = 0;
    }
    return new Decimal(num.toString()).mul(new Decimal(quantity.toString()));
  }

  /**
   * 新增一行关联信息
   */
  addTransportSpec() {
    const column: any = {
      categoryId: null,
      specId: null,
      num: 0,
      quantity: 0
    };
    let columns = [...this.transportSpecs];
    columns.push(column);
    this.transportSpecs = [...columns];
  }

  /**
   * 删除一行关联信息
   *
   * @param index 行号
   */
  removeTransportSpec(index: number) {
    let columns = [...this.transportSpecs];
    columns.splice(index, 1);
    this.transportSpecs = [...columns];
  }

  /**
   * 销毁（关闭）模态框，并返回结果
   *
   * @param refresh 是否刷新，默认为不刷新
   */
  destroyModal(refresh: boolean = false) {
    this.modal.destroy({refresh: refresh});
  }

}
