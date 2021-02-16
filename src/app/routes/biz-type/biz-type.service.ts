import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

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
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/sys-biztype/insert', params);
  }

  /**
   * 修改业务类型
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/sys-biztype/update', params);
  }

  /**
   * 由ID获取业务类型信息
   *
   * @param id 业务类型ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-biztype/findById', {params: {'id': id}});
  }

  /**
   * 获取业务类型列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-biztype/findAllByParam', {params});
  }

  /**
   * 获取所有业务类型列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-biztype/findAll', {});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-biztype/checkCode', {params: {'code': code}});
  }

  /**
   * 由ID删除业务类型信息
   *
   * @param id 业务类型ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().DM_SERVER + '/sys-biztype/deleteById', {params: {'id': id}});
  }

}
