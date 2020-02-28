import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  save(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysUser/save', params);
  }

  /**
   * 修改用户
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysUser/update', params);
  }

  /**
   * 由ID获取用户信息
   *
   * @param id 用户ID
   */
  getById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysUser/getById', {params: {'id': id}});
  }

  /**
   * 获取用户列表
   *
   * @param params
   */
  list(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysUser/listPage', {params});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysUser/checkCode', {params: {'code': code}});
  }

  /**
   * 判断账号是否存在
   *
   * @param account 账号
   */
  checkAccount(account: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysUser/checkAccount', {params: {'account': account}});
  }

  /**
   * 由ID删除用户信息
   *
   * @param id 用户ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysUser/deleteById', {}, {params: {'id': id}});
  }

}
