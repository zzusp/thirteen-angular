import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增用户
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-user/insert', params);
  }

  /**
   * 修改用户
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-user/update', params);
  }

  /**
   * 由ID获取用户信息
   *
   * @param id 用户ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-user/findById', {params: {'id': id}});
  }

  /**
   * 获取用户列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-user/findAllByParam', {params});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-user/checkCode', {params: {'code': code}});
  }

  /**
   * 判断账号是否存在
   *
   * @param account 账号
   */
  checkAccount(account: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-user/checkAccount', {params: {'account': account}});
  }

  /**
   * 由ID删除用户信息
   *
   * @param id 用户ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-user/deleteById', {params: {'id': id}});
  }

}
