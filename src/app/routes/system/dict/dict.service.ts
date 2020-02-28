import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalConstants} from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class DictService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增数据字典
   *
   * @param params
   */
  save(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysDict/save', params);
  }

  /**
   * 修改数据字典
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysDict/update', params);
  }

  /**
   * 由ID获取数据字典信息
   *
   * @param id 数据字典ID
   */
  getById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysDict/getById', {params: {'id': id}});
  }

  /**
   * 获取数据字典列表
   *
   * @param params
   */
  list(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysDict/listPage', {params});
  }

  /**
   * 获取所有数据字典列表
   */
  listAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysDict/listAll', {});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysDict/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除数据字典信息
   *
   * @param id 数据字典ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysDict/deleteById', {}, {params: {'id': id}});
  }
}
