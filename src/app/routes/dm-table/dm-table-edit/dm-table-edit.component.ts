import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { DmTableService } from '../dm-table.service';
import { DmTableModel } from '../dm-table.model';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { abstractValidate } from '../../../@core/util/custom-validators';
import { DmColumnModel } from '../dm-column.model';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-dm-table-edit',
  templateUrl: './dm-table-edit.component.html',
  styleUrls: ['./dm-table-edit.component.scss']
})
export class DmTableEditComponent implements OnInit, OnDestroy {
  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 拖拽组件的name  */
  dragName: string = 'dm-table-edit';
  /** 请求 */
  request: (params: any) => Observable<any>;
  /** 数据字典ID */
  @Input() id: string;
  /** 是否为拷贝操作 */
  @Input() isCopy: boolean;
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
    // 设置拖拽的属性
    this.dragulaService.createGroup(this.dragName, {
      moves: (el, container, handle) => {
        if (handle.hasAttribute('data-icon')) {
          return handle.getAttribute('data-icon') === 'menu';
        }
        if (handle.parentElement.hasAttribute('data-icon')) {
          return handle.parentElement.getAttribute('data-icon') === 'menu';
        }
        return !!handle.className && handle.className.includes('drag-target');
      }
    });
    // 所有需加载的资源都已加载完成，初始化表单
    if (this.isCopy) {
      this.initCopy();
    } else if (this.id !== this.global.INSERT_FLAG) {
      this.initUpdate();
    } else {
      this.initSave();
    }
  }

  ngOnDestroy(): void {
    // 销毁拖拽
    this.dragulaService.destroy(this.dragName);
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
   * 初始化复制
   */
  initCopy() {
    // 初始化请求方法
    this.request = (params): Observable<any> => {
      return this.dmTableService.insert(params);
    };
    // 获取业务类型信息初始化表单
    this.dmTableService.findById(this.id)
      .subscribe((res: ResponseResultModel) => {
        const model: DmTableModel = res.result;
        // 表单重置
        this.editForm.reset({
          id: null,
          code: null,
          name: null,
          status: model.status,
          remark: null,
          version: null,
          columns: model.columns
        });
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

  /**
   * 新增一行列信息
   */
  addColumn() {
    const column: DmColumnModel = {
      id: null,
      code: null,
      name: null,
      dbType: 'VARCHAR',
      length: 50,
      decimalPoint: 0,
      notNull: 0,
      columnType: 3,
      status: 1,
      javaType: null,
      orderNumber: this.columns.length + 1,
      remark: null
    };
    let columns = [...this.columns];
    columns.push(column);
    this.columns = [...columns];
  }

  /**
   * 删除一行列信息
   *
   * @param index 行号
   */
  removeColumn(index: number) {
    let columns = [...this.columns];
    columns.splice(index, 1);
    this.columns = [...columns];
  }

}
