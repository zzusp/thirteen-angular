import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增角色
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/insert', params);
  }

  /**
   * 修改角色
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/update', params);
  }

  /**
   * 由ID获取角色信息
   *
   * @param id 角色ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/findById', {params: {'id': id}});
  }

  /**
   * 由ID获取角色详细信息
   *
   * @param id 角色ID
   */
  getDetail(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/getDetail', {params: {'id': id}});
  }

  /**
   * 角色授权
   *
   * @param params
   */
  authorize(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/authorize', params);
  }

  /**
   * 获取角色列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/findAllByParam', {params});
  }

  /**
   * 获取所有角色列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/findAll', {});
  }

  /**
   * 由组织编码获取所有角色列表
   */
  findAllByGroupCode(groupCode: any): Observable<any> {
    const param = {
      'criterias': [
        {'feild': 'groupCode', 'value': groupCode, 'require': true}
      ]
    };
    return this.findAllByParam(new HttpParams().set('param', JSON.stringify(param)));
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除角色信息
   *
   * @param id 角色ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-role/deleteById', {params: {'id': id}});
  }

}
