import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalConstants } from "../../@core/constant/GlobalConstants";

@Injectable({
  providedIn: 'root'
})
export class DmTableService {

  constructor(private http: HttpClient) {
  }

  /**
   * 生效（根据最新的表信息，生成新的表结构）
   */
  refresh(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/refresh');
  }

  /**
   * 新增表信息
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmTable/insert', params);
  }

  /**
   * 修改表信息
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmTable/update', params);
  }

  /**
   * 由ID获取表信息信息
   *
   * @param id 表信息ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dmTable/findById', {params: {'id': id}});
  }

  /**
   * 获取表信息列表
   *
   * @param params
   */
  findAllBySpecification(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmTable/findAllBySpecification', params);
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  isExist(code: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dmTable/isExist', {params: {'code': code}});
  }

  /**
   * 由ID删除表信息信息
   *
   * @param id 表信息ID
   */
  deleteById(id: string): Observable<any> {
    return this.http.delete(GlobalConstants.getInstance().DM_SERVER + '/dmTable/deleteById', {params: {'id': id}});
  }
}
