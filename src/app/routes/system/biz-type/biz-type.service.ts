import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalConstants} from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class BizTypeService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增业务类型
   *
   * @param params
   */
  save(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/save', params);
  }

  /**
   * 修改业务类型
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/update', params);
  }

  /**
   * 由ID获取业务类型信息
   *
   * @param id 业务类型ID
   */
  getById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/getById', {params: {'id': id}});
  }

  /**
   * 由业务类型编码获取业务类型及其下数据字典的信息
   *
   * @param code 业务类型编码
   */
  getByCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/getByCode', {params: {'code': code}});
  }

  /**
   * 获取业务类型列表
   *
   * @param params
   */
  list(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/listPage', {params});
  }

  /**
   * 获取所有业务类型列表
   */
  listAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/listAll', {});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除业务类型信息
   *
   * @param id 业务类型ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().AUTHORIZATION_SERVER + '/sysBizType/deleteById', {}, {params: {'id': id}});
  }

}
