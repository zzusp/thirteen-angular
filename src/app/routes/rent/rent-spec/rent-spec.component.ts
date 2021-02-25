import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { RentSpecService } from './rent-spec.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { PagerResultModel } from '../../../@core/net/pager-result.model';
import { RentSpecModel } from './rent-spec.model';
import { RentSpecEditComponent } from './rent-spec-edit/rent-spec-edit.component';
import { RentCategoryService } from "../rent-category/rent-category.service";
import { RentCategoryModel } from "../rent-category/rent-category.model";
import { getSorts } from "../../../@core/util/table-sort";

@Component({
  selector: 'app-rent-spec',
  templateUrl: './rent-spec.component.html',
  styleUrls: ['./rent-spec.component.scss']
})
export class RentSpecComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 查询参数  */
  params: any = {
    categoryCode: '',
    name: ''
  };
  /** 当前页码  */
  pageNum: number = 1;
  /** 每页显示记录数  */
  pageSize: number = 10;
  /** 总记录数  */
  total: number = 0;
  /** 表格数据  */
  tableData: RentSpecModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 排序  */
  sortMap = {
    code: null,
    name: null,
    unit: null,
    quantity: null,
    createTime: 'descend',
    updateTime: null
  };
  /** 类别品名下拉框数据 */
  rentCategorys: RentCategoryModel[] = [];
  /** table展示用map */
  rentCategoryMap: any = {};
  /** 页面权限校验  */
  perms = {
    save: true,
    update: true,
    delete: true
  };

  constructor(private rentSpecService: RentSpecService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService,
              private rentCategoryService: RentCategoryService) {
  }

  ngOnInit(): void {
    // 初始化类别品名下拉框
    this.rentCategoryService.findAll()
      .subscribe((res: ResponseResultModel) => {
        this.rentCategorys = res.result.list;
        this.rentCategorys.forEach(v => this.rentCategoryMap[v.code] = v.name);
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
        {'field': 'categoryCode', 'value': this.params.categoryCode},
        {'field': 'name', 'operator': 'like', 'value': this.params.name ? '%' + this.params.name + '%' : null},
      ],
      'page': {
        'pageSize': this.pageSize,
        'pageNum': this.pageNum - 1
      },
      'sorts': getSorts(this.sortMap)
    };
    this.rentSpecService.findAllByParam(param).subscribe((res: ResponseResultModel) => {
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
    this.rentSpecService.deleteById(id).subscribe((res: ResponseResultModel) => {
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
      nzContent: RentSpecEditComponent,
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
