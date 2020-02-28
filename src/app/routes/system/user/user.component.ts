import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { UserService } from './user.service';
import { PagerResultModel } from '../../../@core/net/pager-result.model';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { validatePerms } from '../../../@core/util/perms-validators';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserComponent implements OnInit {

  /**
   * 全局常量
   */
  global: GlobalConstants = GlobalConstants.getInstance();

  /**
   * 查询参数
   */
  params: any = {
    account: '',
    name: '',
    isActive: ''
  };
  /**
   * 是否启用
   */
  isActives: any[] = [];
  /**
   * 当前页码
   */
  pageNum: number = 1;
  /**
   * 每页显示记录数
   */
  pageSize: number = 10;
  /**
   * 总记录数
   */
  total: number = 0;
  /**
   * 表格数据
   */
  tableData: UserModel[] = [];
  /**
   * 加载动画，默认关闭
   */
  loading = false;
  /**
   * 排序
   */
  sortMap = {
    account: null,
    name: null,
    gender: null,
    email: null,
    is_active: null,
    create_time: 'desc',
    update_time: null
  };
  /**
   * 页面权限校验
   */
  perms = {
    save: false,
    update: false,
    delete: false
  };

  constructor(private userService: UserService,
              private nzMessageService: NzMessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.perms = {
      save: validatePerms(['user:save']),
      update: validatePerms(['user:update']),
      delete: validatePerms(['user:delete'])
    };
    this.isActives = [
      {text: '启用', value: this.global.ACTIVE_ON},
      {text: '禁用', value: this.global.ACTIVE_OFF}];
    this.list();
  }

  /**
   * 获取列表信息
   */
  list(): void {
    // 加载动画开启
    this.loading = true;
    const params = new HttpParams()
      .set('account', this.params.account)
      .set('name', this.params.name)
      .set('isActive', this.params.isActive)
      .set('pageSize', this.pageSize.toString())
      .set('pageNum', this.pageNum.toString())
      .set('orderBy', this.getOrderBy());
    this.userService.list(params).subscribe((res: ResponseResultModel) => {
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
   * 过滤方法
   *
   * @param isActive
   */
  filter(isActive: string): void {
    this.params.isActive = !!isActive ? isActive : '';
    this.list();
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
    this.list();
  }

  /**
   * 获取排序参数
   */
  getOrderBy(): string {
    const arr = [];
    for (const key of Object.keys(this.sortMap)) {
      if (this.sortMap[key] != null) {
        arr.push(key + ' ' + this.sortMap[key].replace('end', ''));
      }
    }
    return arr.toString();
  }

  /**
   * 打开新增页面
   */
  showSave() {
    this.router.navigate(['/app/system/user-edit', this.global.INSERT_FLAG]);
  }

  /**
   * 打开修改页面
   *
   * @param id 用户ID
   */
  showUpdate(id: string) {
    this.router.navigate(['/app/system/user-edit', id]);
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
   * 由ID删除用户信息
   *
   * @param id 用户ID
   */
  deleteById(id: string) {
    const msgId = this.nzMessageService.loading(this.global.DELETE_LOADING_MSG).messageId;
    this.userService.deleteById(id).subscribe((res: ResponseResultModel) => {
      this.nzMessageService.remove(msgId);
      // 判断返回状态码是否为200（成功状态码）
      if (res.status === 200) {
        this.nzMessageService.success(this.global.DELETE_SUCESS_MSG);
      }
      this.list();
    });
  }

}
