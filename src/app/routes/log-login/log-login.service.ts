import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class LogLoginService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增登录日志
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-login/insert', params);
  }

  /**
   * 由ID获取登录日志信息
   *
   * @param id 登录日志ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-login/findById', {params: {'id': id}});
  }

  /**
   * 获取登录日志列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-login/findAllByParam', {params});
  }

  /**
   * 由ID删除登录日志信息
   *
   * @param id 登录日志ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-login/deleteById', {params: {'id': id}});
  }
}
