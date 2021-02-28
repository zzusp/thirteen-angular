import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../../@core/constant/GlobalConstants';
import { forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentContractService } from '../rent-contract.service';
import { DatePipe } from '@angular/common';
import { ResponseResultModel } from '../../../../@core/net/response-result.model';
import { RentContractModel } from '../rent-contract.model';
import { RentRenterService } from '../../rent-renter/rent-renter.service';
import { RentRenterModel } from '../../rent-renter/rent-renter.model';
import { RentCategoryModel } from '../../rent-category/rent-category.model';
import { RentCategoryService } from '../../rent-category/rent-category.service';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-rent-contract-edit',
  templateUrl: './rent-contract-edit.component.html',
  styleUrls: ['./rent-contract-edit.component.scss']
})
export class RentContractEditComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 路由参数 */
  @Input() id: string;
  /** 编辑表单 */
  editForm: FormGroup;
  /** 标题 */
  title: string;
  /** 承租单位下拉框数据 */
  rentRenters: RentRenterModel[] = [];
  /** 类别品名下拉框数据 */
  rentCategories: RentCategoryModel[] = [];
  /** 选中的类别品名id */
  selectedCategories = new Set<string>();
  /** checkbox indeterminate 状态 */
  indeterminate: boolean = false;
  /** 选中的承租单位 */
  selectRentRenter: string;
  /** 日期格式 */
  dateFormat: string = 'yyyy-MM-dd';

  constructor(private modal: NzModalRef,
              private rentContractService: RentContractService,
              private rentRenterService: RentRenterService,
              private rentCategoryService: RentCategoryService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // 初始化承租单位下拉框，物品种类下拉框
    const rentRenterReq = this.rentRenterService.findAll();
    const rentCategoryReq = this.rentCategoryService.findAll();
    // 发出请求
    forkJoin([rentRenterReq, rentCategoryReq])
      .subscribe((results: ResponseResultModel[]) => {
        const rentRenterRes = results[0];
        const rentCategoryRes = results[1];
        this.rentRenters = rentRenterRes.result.list;
        this.rentCategories = rentCategoryRes.result.list;
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      renterId: [null, Validators.required],
      location: null,
      contacts: [null, Validators.required],
      signDate: [null, Validators.required],
      computeMode: [null, Validators.required],
      contractStatus: [null, Validators.required],
      amountPayable: null,
      amountPaid: null,
      balanceDate: null,
      remark: [null, Validators.maxLength(250)],
      version: [null],
      rentContractCategories: [[], Validators.required]
    });
    // 所有需加载的资源都已加载完成，初始化表单
    if (this.id !== this.global.INSERT_FLAG) {
      this.initUpdate();
    } else {
      this.initSave();
    }
  }

  /**
   * 表格全选或取消全选事件
   *
   * @param checked
   */
  onAllChecked(checked: boolean): void {
    this.rentCategories.forEach(({id}) => this.updateCheckedSet(id, checked));
  }

  /**
   * 行记录的勾选事件
   *
   * @param id 品名类别的id
   * @param checked 选中状态
   */
  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  /**
   * 设置选中或取消选中
   *
   * @param id 品名类别的id
   * @param checked 选中状态
   */
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.selectedCategories.add(id);
    } else {
      this.selectedCategories.delete(id);
    }
    // 将选中的id更新到表单
    if (this.selectedCategories.size == 0) {
      this.editForm.get('rentContractCategories').setValue(null);
    } else {
      const selected = [];
      this.selectedCategories.forEach(v => {
        selected.push({categoryId: v});
      });
      this.editForm.get('rentContractCategories').setValue(selected);
    }
  }

  /**
   * 初始化新增
   */
  initSave() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentContractService.insert(params);
    };
    // 设置标题
    this.title = '新增合同信息';
    // 表单重置
    this.editForm.reset({
      id: null,
      renterId: null,
      location: null,
      contacts: null,
      signDate: null,
      computeMode: this.global.COMPUTE_MODE_ALL,
      contractStatus: this.global.CONTRACT_OPEN,
      amountPayable: null,
      amountPaid: null,
      balanceDate: null,
      remark: null,
      version: null,
      rentContractCategories: []
    });
  }

  /**
   * 初始化更新
   */
  initUpdate() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.rentContractService.update(params);
    };
    // 设置标题
    this.title = '修改合同信息';
    // 获取合同信息初始化表单
    this.rentContractService.findWithCategoryById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: RentContractModel = res.result;
        // 表单重置
        this.editForm.reset({
          id: model.id,
          renterId: model.renterId,
          location: model.location,
          contacts: model.contacts,
          signDate: model.signDate,
          computeMode: model.computeMode,
          contractStatus: model.contractStatus,
          amountPayable: model.amountPayable,
          amountPaid: model.amountPaid,
          balanceDate: model.balanceDate,
          remark: model.remark,
          version: model.version,
          rentContractCategories: model.rentContractCategories
        });
        if (model.rentContractCategories != null) {
          // 设置已选中的类别品名
          model.rentContractCategories.forEach(v => {
            this.updateCheckedSet(v.categoryId, true);
          });
        }
        this.selectRentRenter = model.renterId;
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
    this.editForm.get('renterId').setValue(this.selectRentRenter);
    if (this.editForm.valid) {
      // 初始化日期管道对象
      const datePipe = new DatePipe('en-US');
      const signDate = this.editForm.get('signDate').value;
      this.editForm.get('signDate').setValue(datePipe.transform(signDate, this.dateFormat));
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
