import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增组织
   *
   * @param params
   */
  save(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysGroup/save', params);
  }

  /**
   * 修改组织
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysGroup/update', params);
  }

  /**
   * 由ID获取组织信息
   *
   * @param id 组织ID
   */
  getById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysGroup/getById', {params: {'id': id}});
  }

  /**
   * 获取组织列表
   *
   * @param params
   */
  list(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysGroup/listPage', {params});
  }

  /**
   * 获取所有组织列表
   */
  listAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysGroup/listAll', {});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysGroup/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除组织信息
   *
   * @param id 组织ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysGroup/deleteById', {}, {params: {'id': id}});
  }
}
