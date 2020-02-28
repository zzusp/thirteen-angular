import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class LogOperationService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增操作日志
   *
   * @param params
   */
  save(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogOperation/save', params);
  }

  /**
   * 由ID获取操作日志信息
   *
   * @param id 操作日志ID
   */
  getById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogOperation/getById', {params: {'id': id}});
  }

  /**
   * 获取操作日志列表
   *
   * @param params
   */
  list(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogOperation/listPage', {params});
  }

  /**
   * 由ID删除操作日志信息
   *
   * @param id 操作日志ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysLogOperation/deleteById', {}, {params: {'id': id}});
  }
}
