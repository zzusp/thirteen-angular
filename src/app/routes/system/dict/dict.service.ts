import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

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
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dict/insert', params);
  }

  /**
   * 修改数据字典
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dict/update', params);
  }

  /**
   * 由ID获取数据字典信息
   *
   * @param id 数据字典ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dict/findById', {params: {'id': id}});
  }

  /**
   * 获取数据字典列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dict/findAllByParam', {params});
  }

  /**
   * 获取所有数据字典列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dict/findAll', {});
  }

  /**
   * 由业务类型编码获取所有角色列表
   */
  findAllByBizTypeCode(bizTypeCode: any): Observable<any> {
    const param = {
      'criterias': [
        {'feild': 'bizTypeCode', 'value': bizTypeCode, 'require': true}
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
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dict/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除数据字典信息
   *
   * @param id 数据字典ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sys-dict/deleteById', {params: {'id': id}});
  }
}
