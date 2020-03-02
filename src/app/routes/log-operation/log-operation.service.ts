import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

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
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-operation/insert', params);
  }

  /**
   * 由ID获取操作日志信息
   *
   * @param id 操作日志ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-operation/findById', {params: {'id': id}});
  }

  /**
   * 获取操作日志列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-operation/findAllByParam', {params});
  }

  /**
   * 由ID删除操作日志信息
   *
   * @param id 操作日志ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-log-operation/deleteById', {params: {'id': id}});
  }
}
