import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

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
  save(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogLogin/save', params);
  }

  /**
   * 由ID获取登录日志信息
   *
   * @param id 登录日志ID
   */
  getById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogLogin/getById', {params: {'id': id}});
  }

  /**
   * 获取登录日志列表
   *
   * @param params
   */
  list(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogLogin/listPage', {params});
  }

  /**
   * 由ID删除登录日志信息
   *
   * @param id 登录日志ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogLogin/deleteById', {}, {params: {'id': id}});
  }
}
