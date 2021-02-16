import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增模块
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/sys-application/insert', params);
  }

  /**
   * 修改模块
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/sys-application/update', params);
  }

  /**
   * 由ID获取模块信息
   *
   * @param id 模块ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-application/findById', {params: {'id': id}});
  }

  /**
   * 获取模块列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-application/findAllByParam', {params});
  }

  /**
   * 获取所有模块列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-application/findAll', {});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-application/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除模块信息
   *
   * @param id 模块ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().DM_SERVER + '/sys-application/deleteById', {params: {'id': id}});
  }

}
