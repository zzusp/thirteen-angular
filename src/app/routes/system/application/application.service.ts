import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalConstants} from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  /**
   * 新增模块
   *
   * @param params
   */
  save(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysApplication/save', params);
  }

  /**
   * 修改模块
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysApplication/update', params);
  }

  /**
   * 由ID获取模块信息
   *
   * @param id 模块ID
   */
  getById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysApplication/getById', {params: {'id': id}});
  }

  /**
   * 获取模块列表
   *
   * @param params
   */
  list(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysApplication/listPage', {params});
  }

  /**
   * 获取所有模块列表
   */
  listAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysApplication/listAll', {});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysApplication/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除模块信息
   *
   * @param id 模块ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysApplication/deleteById', {}, {params: {'id': id}});
  }

}
