import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { DmTableService } from '../dm-table.service';
import { DmTableModel } from '../dm-table.model';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { DragulaService } from 'ng2-dragula';
import { abstractValidate } from '../../../@core/util/custom-validators';
import { DmColumnModel } from '../dm-column.model';

@Component({
  selector: 'app-dm-table-edit',
  templateUrl: './dm-table-edit.component.html',
  styleUrls: ['./dm-table-edit.component.scss']
})
export class DmTableEditComponent implements OnInit {
  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 数据字典ID */
  @Input() id: string;
  /** 编辑表单 */
  editForm: FormGroup;
  /** 编辑表单 */
  columns: DmColumnModel[] = [];

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private dmTableService: DmTableService,
              private dragulaService: DragulaService) {
  }

  ngOnInit(): void {
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      code: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      name: [null, Validators.required],
      status: [null, Validators.required],
      remark: [null, Validators.maxLength(250)],
      version: [null],
      columns: [[]]
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
      return this.dmTableService.insert(params);
    };
    // 添加异步验证，验证code是否存在，错误标识 existing
    this.editForm.get('code').setAsyncValidators(abstractValidate((code: string) => {
      return this.dmTableService.isExist(code);
    }));
    // 表单重置
    this.editForm.reset({
      id: null,
      code: null,
      name: null,
      status: this.global.STATUS_ON,
      remark: null,
      version: null,
      columns: []
    });
    this.editForm.get('code').enable();
  }

  /**
   * 初始化更新
   */
  initUpdate() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.dmTableService.update(params);
    };
    // 获取业务类型信息初始化表单
    this.dmTableService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: DmTableModel = res.result;
        this.editForm.get('code').clearAsyncValidators();
        // 表单重置
        this.editForm.reset({
          id: model.id,
          code: model.code,
          name: model.name,
          status: model.status,
          remark: model.remark,
          version: model.version,
          columns: model.columns
        });
        this.editForm.get('code').disable();
        this.columns = model.columns;
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
      this.sort(this.columns, 'orderNumber');
      this.editForm.get('columns').setValue(this.columns);
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

  sort(datas: any[], key: string) {
    if (datas === null || datas.length === 0) {
      return;
    }
    datas.forEach((val, i) => {
      val[key] = i + 1;
    });
  }

  addColumn() {
    const column: DmColumnModel = {
      id: null,
      code: null,
      name: null,
      dbType: 'VARCHAR',
      length: 50,
      notNull: 0,
      columnType: 3,
      status: 1,
    }
    this.columns.push(column);
  }

  removeColumn(index: number) {
    this.columns.splice(index, 1);
  }

}
