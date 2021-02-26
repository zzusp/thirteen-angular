import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from "../../../../@core/constant/GlobalConstants";
import { forkJoin, Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { RentContractService } from "../rent-contract.service";
import { DictService } from "../../../dict/dict.service";
import { DatePipe, Location } from "@angular/common";
import { abstractValidate } from "../../../../@core/util/custom-validators";
import { ResponseResultModel } from "../../../../@core/net/response-result.model";
import { UserModel } from "../../../user/user.model";
import { RentContractModel } from "../rent-contract.model";
import { RentRenterService } from "../../rent-renter/rent-renter.service";
import { RentItemService } from "../../rent-item/rent-item.service";
import { listToTree } from "../../../../@core/util/tree-node";
import { RentItemModel } from "../../rent-item/rent-item.model";
import { RentRenterModel } from "../../rent-renter/rent-renter.model";

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
  routeParams: any = {id: null};
  /** 编辑表单 */
  editForm: FormGroup;
  /** 标题 */
  title: string;
  /** 承租单位下拉框数据 */
  rentRenters: RentRenterModel[] = [];
  /** 物品种类下拉框数据 */
  rentItems: RentItemModel[] = [];
  /** 选中的承租单位 */
  selectRentRenter: string;
  /** 日期格式 */
  dateFormat: string = 'yyyy-MM-dd';


  constructor(private route: ActivatedRoute,
              private rentContractService: RentContractService,
              private rentRenterService: RentRenterService,
              private rentItemService: RentItemService,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit(): void {
    //  初始化承租单位下拉框，物品种类下拉框
    const rentRenterReq = this.rentRenterService.findAll();
    const rentItemReq = this.rentItemService.findAll();
    // 发出请求
    forkJoin([rentRenterReq, rentItemReq])
      .subscribe((results: ResponseResultModel[]) => {
        const rentRenterRes = results[0];
        const rentItemRes = results[1];
        this.rentRenters = rentRenterRes.result.list;
        this.rentItems = rentItemRes.result.list;
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
      version: [null]
    });
    // 获取路由参数
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.routeParams.id = params.get('id');
      // 所有需加载的资源都已加载完成，初始化表单
      if (this.routeParams.id !== this.global.INSERT_FLAG) {
        this.initUpdate();
      } else {
        this.initSave();
      }
    });
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
      version: null
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
    // 获取用户信息初始化表单
    this.rentContractService.findById(this.routeParams.id)
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
          version: model.version
        });
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
        // 返回上一页
        this.goBack();
      });
    }
  }

  /**
   * 返回上一页
   */
  goBack() {
    this.location.back();
  }

}
