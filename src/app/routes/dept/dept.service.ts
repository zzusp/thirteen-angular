import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class DeptService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增部门
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dept/insert', params);
  }

  /**
   * 修改部门
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dept/update', params);
  }

  /**
   * 由ID获取部门信息
   *
   * @param id 部门ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dept/findById', {params: {'id': id}});
  }

  /**
   * 获取部门列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dept/findAllByParam', {params});
  }

  /**
   * 获取所有部门列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dept/findAll', {});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dept/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除部门信息
   *
   * @param id 部门ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dept/deleteById', {params: {'id': id}});
  }
}
