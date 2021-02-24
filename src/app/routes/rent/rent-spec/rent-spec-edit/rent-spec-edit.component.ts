import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentItemModel } from '../../rent-item/rent-item.model';
import { NzModalRef } from 'ng-zorro-antd';
import { RentCategoryService } from '../../rent-category/rent-category.service';
import { RentItemService } from '../../rent-item/rent-item.service';
import { RentSpecService } from '../rent-spec.service';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { RentCategoryModel } from '../../rent-category/rent-category.model';
import { RentSpecModel } from '../rent-spec.model';

@Component({
  selector: 'app-rent-spec-edit',
  templateUrl: './rent-spec-edit.component.html',
  styleUrls: ['./rent-spec-edit.component.scss']
})
export class RentSpecEditComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 业务类型ID */
  @Input() id: string;
  /** 编辑表单 */
  editForm: FormGroup;
  /** 物品种类下拉框数据 */
  rentItems: RentItemModel[] = [];
  /** 类别品名下拉框数据 */
  rentCategorys: RentCategoryModel[] = [];
  /** 所有类别品名数据 */
  allRentCategory: RentCategoryModel[] = [];

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private rentSpecService: RentSpecService,
              private rentCategoryService: RentCategoryService,
              private rentItemService: RentItemService) {
  }

  ngOnInit(): void {
    //  初始化物品种类下拉框，类别品名下拉框
    const rentItemReq = this.rentItemService.findAll();
    const rentCategoryReq = this.rentCategoryService.findAll();
    // 发出请求
    forkJoin([rentItemReq, rentCategoryReq])
      .subscribe((results: ResponseResultModel[]) => {
        const rentItemRes = results[0];
        const rentCategoryRes = results[1];
        this.rentItems = rentItemRes.result.list;
        this.allRentCategory = rentCategoryRes.result.list;
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      itemCode: [null, Validators.required],
      categoryCode: [null, Validators.required],
      name: [null, Validators.required],
      unit: [null, Validators.required],
      quantity: [null, Validators.required],
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

  itemCodeChange($event: string) {
    this.rentCategorys = this.allRentCategory.filter(v => v.itemCode == $event);
    console.log(this.rentCategorys);
  }

  /**
   * 新增表单初始化
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentSpecService.insert(params);
    };
    // 表单重置
    this.editForm.reset({
      id: null,
      itemCode: null,
      categoryCode: null,
      name: null,
      unit: this.global.UNIT_GE,
      quantity: null,
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
      return this.rentSpecService.update(params);
    };
    // 获取业务类型信息初始化表单
    this.rentSpecService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: RentSpecModel = res.result;
        // 表单重置
        this.editForm.reset({
          id: model.id,
          itemCode: model.itemCode,
          categoryCode: model.categoryCode,
          name: model.name,
          unit: model.unit,
          quantity: model.quantity,
          remark: model.remark,
          version: model.version
        });
      });
  }

  /**
   * 表单提交
   */
  submitForm() {
    for (const key of Object.keys(this.editForm.controls)) {
      this.editForm.controls[key].markAsDirty();
      this.editForm.controls[key].updateValueAndValidity({onlySelf: true});
    }
    if (this.editForm.valid) {
      this.request(this.editForm.getRawValue()).subscribe((res: ResponseResultModel) => {
        // 清空表单
        // this.editForm.reset();
        // 关闭模态框
        // this.destroyModal(true);
      });
    }
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
