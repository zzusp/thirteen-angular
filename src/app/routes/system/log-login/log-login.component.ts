import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { HttpParams } from '@angular/common/http';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { PagerResultModel } from '../../../@core/net/pager-result.model';
import { LogLoginService } from './log-login.service';
import { LogLoginModel } from './log-login.model';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { LogLoginDetailComponent } from './log-login-detail/log-login-detail.component';
import { validatePerms } from '../../../@core/util/perms-validators';

@Component({
  selector: 'app-log-login',
  templateUrl: './log-login.component.html',
  styleUrls: ['./log-login.component.scss']
})
export class LogLoginComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 查询参数  */
  params: any = {
    account: '',
    status: ''
  };
  /** 当前页码  */
  pageNum: number = 1;
  /** 每页显示记录数  */
  pageSize: number = 10;
  /** 总记录数  */
  total: number = 0;
  /** 表格数据  */
  tableData: LogLoginModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 排序  */
  sortMap = {
    account: null,
    requestPath: null,
    status: null,
    loginTime: 'desc'
  };
  /** 页面权限校验  */
  perms = {
    delete: false
  };

  constructor(private logLoginService: LogLoginService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.perms = {
      delete: validatePerms(['logLogin:delete'])
    };
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
        {'feild': 'account', 'operator': 'like', 'value': this.params.account ? '%' + this.params.account + '%' : null},
        {'feild': 'status', 'value': this.params.status}
      ],
      'page': {
        'pageSize': this.pageSize,
        'pageNum': this.pageNum - 1
      },
      'sorts': this.getSorts()
    };
    this.logLoginService.findAllByParam(new HttpParams().set('param', JSON.stringify(param))).subscribe((res: ResponseResultModel) => {
      // 判断返回结果是否为空或null
      if (res.result) {
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
   * 获取排序参数
   */
  getSorts(): any[] {
    const arr = [];
    for (const key of Object.keys(this.sortMap)) {
      if (this.sortMap[key] != null) {
        arr.push({field: key, orderBy: this.sortMap[key].replace('end', '')});
      }
    }
    return arr;
  }

  /**
   * 打开详情页面
   *
   * @param id 登录日志ID
   */
  showDetail(id: string) {
    this.openModel(id, '登录日志详细信息');
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
   * 由ID删除登录日志信息
   *
   * @param id 登录日志ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.logLoginService.deleteById(id).subscribe((res: ResponseResultModel) => {
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
   * @param id 登陆日志ID
   * @param title 模态框标题
   */
  openModel(id: string, title: string): NzModalRef {
    return this.modalService.create({
      nzTitle: title,
      nzContent: LogLoginDetailComponent,
      nzWidth: 800,
      nzComponentParams: {
        id: id
      },
      nzFooter: [
        {
          label: '返回',
          onClick: (componentInstance) => {
            componentInstance.destroyModal();
          }
        }
      ]
    });
  }

}
