import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { RentCategoryService } from '../rent-category.service';
import { abstractValidate } from '../../../../@core/util/custom-validators';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { RentItemModel } from '../../rent-item/rent-item.model';
import { RentCategoryModel } from '../rent-category.model';
import { RentItemService } from '../../rent-item/rent-item.service';

@Component({
  selector: 'app-rent-category-edit',
  templateUrl: './rent-category-edit.component.html',
  styleUrls: ['./rent-category-edit.component.scss']
})
export class RentCategoryEditComponent implements OnInit {

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

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private rentCategoryService: RentCategoryService,
              private rentItemService: RentItemService) {
  }

  ngOnInit(): void {
    // 初始化物品种类下拉框
    this.rentItemService.findAll()
      .subscribe((res: ResponseResultModel) => {
        this.rentItems = res.result.list;
        // 所有需加载的资源都已加载完成，初始化表单
        if (this.id !== this.global.INSERT_FLAG) {
          this.initUpdate();
        } else {
          this.initSave();
        }
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      itemId: [null, Validators.required],
      name: [null, Validators.required],
      dailyRent: [null, Validators.required],
      unit: [null, Validators.required],
      remark: [null, Validators.maxLength(250)],
      version: [null]
    });
  }

  /**
   * 新增表单初始化
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentCategoryService.insert(params);
    };
    // 添加异步验证，验证name是否存在，错误标识 existing
    this.editForm.get('name').setAsyncValidators(abstractValidate((name: string) => {
      return this.rentCategoryService.checkName(name);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      itemId: null,
      name: null,
      dailyRent: null,
      unit: this.global.UNIT_GE,
      remark: null,
      version: null
    });
    this.editForm.get('name').enable();
  }

  /**
   * 初始化更新
   */
  initUpdate() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentCategoryService.update(params);
    };
    // 获取业务类型信息初始化表单
    this.rentCategoryService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: RentCategoryModel = res.result;
        this.editForm.get('name').clearAsyncValidators();
        // 表单重置
        this.editForm.reset({
          id: model.id,
          itemId: model.itemId,
          name: model.name,
          dailyRent: model.dailyRent,
          unit: model.unit,
          remark: model.remark,
          version: model.version
        });
        this.editForm.get('name').disable();
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
        this.editForm.reset();
        // 关闭模态框
        this.destroyModal(true);
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
