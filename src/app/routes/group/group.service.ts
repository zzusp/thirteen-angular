import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
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
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/sys-group/insert', params);
  }

  /**
   * 修改组织
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/sys-group/update', params);
  }

  /**
   * 由ID获取组织信息
   *
   * @param id 组织ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-group/findById', {params: {'id': id}});
  }

  /**
   * 获取组织列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-group/findAllByParam', {params});
  }

  /**
   * 获取所有组织列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/findAll', {params: {'table': 'auth_group'}});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-group/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除组织信息
   *
   * @param id 组织ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().DM_SERVER + '/sys-group/deleteById', {params: {'id': id}});
  }
}
